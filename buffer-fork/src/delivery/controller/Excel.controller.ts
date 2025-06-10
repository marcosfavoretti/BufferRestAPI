import { Controller, Inject, Post } from "@nestjs/common";
import { CompactBuffer } from "src/modules/excel/@core/class/CompactBuffer";
import { AdicionarNoExcelUseCase } from "src/modules/excel/application/AdicionarNoExcel.usecase";
import { CompactBufferDataService } from "src/modules/excel/infra/service/CompactBufferData.service";

@Controller('/excel')
export class ExcelController {
    @Inject(AdicionarNoExcelUseCase) private adicionarNoExcelUseCase: AdicionarNoExcelUseCase
    @Post('/')
    async compactBuffer2ExcelMethod(): Promise<void> {
        await this.adicionarNoExcelUseCase.run();
    }

}