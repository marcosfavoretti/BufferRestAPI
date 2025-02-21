import { Module } from "@nestjs/common";
import { BufferController } from "./controller/Buffer.controller";
import { BufferModule } from "src/modules/buffer/Buffer.module";
import { ItemQtdSemanaController } from "./controller/ItemQtdSemana.controller";

@Module({
    imports: [BufferModule],
    controllers: [BufferController, ItemQtdSemanaController],
    providers: [],
    exports: []
})
export class DeliveryModule{}