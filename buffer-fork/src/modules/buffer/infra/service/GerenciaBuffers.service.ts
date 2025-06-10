import { Inject, NotFoundException } from "@nestjs/common";
import { BufferHistorico } from "../../@core/entities/BufferHistorico.entity";
import { BufferHistoricoRepository } from "../repository/BufferHistorico.repository";
import { FalhaSalvandoBufferException } from "../../exception/FalhaSalvandoBuffer.exception";
import { EntityNotFoundError } from "typeorm";
import { FalhaConsultandoBufferException } from "../../exception/FalhaConsultandoBuffer.exception";
import { NotFoundError } from "rxjs";
import { startOfDay } from "date-fns";

export class GerenciaBuffersService {
    constructor(@Inject(BufferHistoricoRepository) private bufferRepo: BufferHistoricoRepository) { }

    async salva(...itens: BufferHistorico[]): Promise<BufferHistorico[]> {
        try {
            return await this.bufferRepo.save(itens, {chunk: 10});

        } catch (error) {
            console.error(error);
            throw new FalhaSalvandoBufferException();
        }
    }

    async consultaItemNoDia(partcode: string, dia: Date, mercadoName: string): Promise<BufferHistorico> {
        try {
            return await this.bufferRepo.findOneOrFail({
                where: {
                    item: {
                        Item: partcode
                    },
                    serverTime: startOfDay(dia),
                    mercado: {
                        nome: mercadoName
                    }
                }
            });
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException(`Não foi achado nenhum buffer para o ${partcode}`);
            }
            console.error(error);
            throw new FalhaConsultandoBufferException();
        }
    }
}