import { Body, Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { BufferHistorico } from "src/modules/buffer/@core/entities/BufferHistorico.entity";
import { SaveBufferLogDto } from "./dto/SaveBufferLog.dto";
import { SaveBufferInHistUseCase } from "src/modules/buffer/application/SaveBufferInHist.usecase";
import { ConsultarBufferCompactadoUseCase } from "src/modules/excel/application/ConsultarBufferCompactado.usecase";
import { ApiQuery } from '@nestjs/swagger';
import { endOfDay, parse } from "date-fns";

@Controller('/buffer')
export class BufferController {

    @Inject(SaveBufferInHistUseCase) private bufferHistUseCase: SaveBufferInHistUseCase;
    @Post('/')
    async saveBufferLog(@Body() dto: SaveBufferLogDto): Promise<BufferHistorico> {
        return await this.bufferHistUseCase.saveHistorico(dto);
    }

    @Inject(ConsultarBufferCompactadoUseCase) private consultarBufferCompactadoUseCase: ConsultarBufferCompactadoUseCase;
    @ApiQuery({ example: '12-06-2025', name: 'startDate', required: true, type: String, description: 'Data inicial (obrigatória)' })
    @ApiQuery({ example: '12-06-2025', name: 'endDate', required: false, type: String, description: 'Data final (opcional)' })
    @Get()
    async consultBufferMethod(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string
    ) {
        if (!startDate) {
            throw new Error('startDate query parameter is required');
        }
        const start = parse(startDate, 'dd-MM-yyyy', new Date());
        const end = endDate ? endOfDay(parse(endDate, 'dd-MM-yyyy', new Date())) : endOfDay(new Date());
        return await this.consultarBufferCompactadoUseCase.consultar({
            startDate: start,
            endDate: end
        });
    }
}