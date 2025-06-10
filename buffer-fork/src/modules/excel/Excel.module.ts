import { Module } from "@nestjs/common";
import { BufferServiceModule } from "../buffer/BufferService.module";
import { CompactBufferDataService } from "./infra/service/CompactBufferData.service";
import { AdicionarNoExcelUseCase } from "./application/AdicionarNoExcel.usecase";
import { ExcelService } from "./infra/service/Excel.service";

@Module({
    imports: [BufferServiceModule],
    providers: [CompactBufferDataService,AdicionarNoExcelUseCase, ExcelService],
    exports: [CompactBufferDataService,AdicionarNoExcelUseCase]
})
export class ExcelModule{}