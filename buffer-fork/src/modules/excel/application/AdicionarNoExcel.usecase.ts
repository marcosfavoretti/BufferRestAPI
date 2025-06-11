import { Inject, InternalServerErrorException, Logger } from "@nestjs/common";
import { CompactBufferDataService } from "../infra/service/CompactBufferData.service";
import { ExcelService } from "../infra/service/Excel.service";
import { CompactBuffer } from "../@core/class/CompactBuffer";
import { toZonedTime, format } from 'date-fns-tz';
import { UTCDate } from "@date-fns/utc";
import { startOfDay } from "date-fns";

export class AdicionarNoExcelUseCase {
    private readonly excelFile = process.env.EXCELFILE;
    private readonly logger: Logger = new Logger();
    private readonly sheetTarget = 'DADOS';
    private readonly timeZone = 'America/Sao_Paulo';

    constructor(
        @Inject(CompactBufferDataService) private readonly compactBufferDataService: CompactBufferDataService,
        @Inject(ExcelService) private readonly excelService: ExcelService,
    ) {
        this.logger.debug(`Excel file: ${this.excelFile}`);
    }

    async run(): Promise<void> {
        try {
            const _data = await this.compactBufferDataService.compact();
            const data = this.fixDataToTimezone(_data);
            const workBook = await this.excelService.openWorkBook(this.excelFile);
            await this.excelService.appendDataToEnd(workBook, data, this.sheetTarget);
            await this.excelService.saveToFile(workBook, this.excelFile);
            this.logger.debug(`Dados salvos em: ${this.excelFile}`);
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    private fixDataToTimezone(data: CompactBuffer[]): any[] {
        return data.map(d => {
            const originalDate = new UTCDate(d.serverTime);
            return {
                ...d,
                serverTime: startOfDay(originalDate),
            };
        });
    }
}
