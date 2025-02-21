import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { BufferHistorico } from "src/modules/buffer/@core/entities/BufferHistorico.entity";
import { SaveBufferLogDto } from "./dto/SaveBufferLog.dto";
import { SaveBufferInHistUseCase } from "src/modules/buffer/application/SaveBufferInHist.usecase";

@Controller('/buffer')
export class BufferController {

    @Inject(SaveBufferInHistUseCase) private bufferHistUseCase: SaveBufferInHistUseCase;
    @Post('/')
    async saveBufferLog(@Body() dto: SaveBufferLogDto):Promise<BufferHistorico>{
        return await this.bufferHistUseCase.saveHistorico(dto);
    }
}