import { Inject, InternalServerErrorException, Logger } from "@nestjs/common";
import { CompactBufferDataService } from "../infra/service/CompactBufferData.service";
import { ExcelService } from "../infra/service/Excel.service";
import { Calendario } from "src/modules/shared/@core/Calendario";
import { CompactBuffer } from "../@core/class/CompactBuffer";

export class AdicionarNoExcelUseCase {
    private excelFile = process.env.EXCELFILE
    private logger: Logger = new Logger();
    private calendario = new Calendario();
    private readonly sheetTarget = '__dados__'
    constructor(
        @Inject(CompactBufferDataService) private compactBufferDataService: CompactBufferDataService,
        @Inject(ExcelService) private excelService: ExcelService,
    ) {
        this.logger.debug(this.excelFile);
    }
    async run(): Promise<void> {
        try {
            const _data = await this.compactBufferDataService.compact();
            const data = this.fixDataToUTC(_data);
            const workBook = await this.excelService.openWorkBook(this.excelFile);
            if (!this.excelService.sheetExists(workBook, this.sheetTarget)) {
                this.excelService.appendToSheet(workBook, data, this.sheetTarget);
            }
            else {
                this.excelService.appendDataToEnd(workBook, data, this.sheetTarget);
            }
            this.excelService.saveToFile(workBook, this.excelFile);
            console.log(this.excelFile)
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error.message)
        }
    }

    private fixDataToUTC(data: CompactBuffer[]): any[] {
        return data.map(d => {
            const originalDate = new Date(d.serverTime);
            const correctedDate = this.calendario.addDate(originalDate, 1);
            return {
                ...d,
                serverTime: correctedDate // Substitui a data original pela data corrigida
            };
        })
    }

}