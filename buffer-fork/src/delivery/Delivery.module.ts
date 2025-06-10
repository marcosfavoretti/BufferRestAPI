import { Module } from "@nestjs/common";
import { BufferController } from "./controller/Buffer.controller";
import { BufferModule } from "src/modules/buffer/Buffer.module";
import { ItemQtdSemanaController } from "./controller/ItemQtdSemana.controller";
import { SetoresController } from "./controller/Setores.controller";
import { ExcelModule } from "src/modules/excel/Excel.module";
import { ExcelController } from "./controller/Excel.controller";

@Module({
    imports: [BufferModule, ExcelModule],
    controllers: [ExcelController, BufferController, ItemQtdSemanaController, SetoresController],
    providers: [],
    exports: []
})
export class DeliveryModule { }