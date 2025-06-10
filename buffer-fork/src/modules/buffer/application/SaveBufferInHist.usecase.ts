import { BufferHistorico } from "../@core/entities/BufferHistorico.entity";
import { SaveBufferLogDto } from "src/delivery/controller/dto/SaveBufferLog.dto";
import { Inject } from "@nestjs/common";
import { GerenciaBuffersService } from "../infra/service/GerenciaBuffers.service";

export class SaveBufferInHistUseCase {
    constructor(
        @Inject(GerenciaBuffersService) private gerenciaBufferService: GerenciaBuffersService
    ) { }

    async saveHistorico(dto: SaveBufferLogDto): Promise<BufferHistorico> {
        try {
            const savedData = await this.gerenciaBufferService.consultaItemNoDia(dto.item, new Date(), dto.mercadoName);
            savedData.buffer = dto.qtd
            return (await this.gerenciaBufferService.salva(savedData))[0];
        } catch (error) {
            throw error;
        }
    }
}