import { Module } from "@nestjs/common";
import { IniciaNovoDiaJob } from "./IniciaNovoDia.job";
import { BufferServiceModule } from "src/modules/buffer/BufferService.module";

@Module({
    imports: [BufferServiceModule],
    providers: [IniciaNovoDiaJob]
})
export class JobsModule{}