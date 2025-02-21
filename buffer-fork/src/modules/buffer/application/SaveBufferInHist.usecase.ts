import { BufferHistorico } from "../@core/entities/BufferHistorico.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SaveBufferLogDto } from "src/delivery/controller/dto/SaveBufferLog.dto";
import { format } from "date-fns";
import { BufferHistoricoBuilder } from "../@core/builder/BufferHistorico.builder";
import { ItemQtdSemana } from "../@core/entities/ItemQtdSemana.entity";
import { NotFoundException } from "@nestjs/common";

export class SaveBufferInHistUseCase {
    constructor(
        @InjectRepository(ItemQtdSemana) private itemqtdRepo: Repository<ItemQtdSemana>,
        @InjectRepository(BufferHistorico) private repo: Repository<BufferHistorico>
    ) { }

    async saveHistorico(dto: SaveBufferLogDto): Promise<BufferHistorico> {
        const today = format(new Date(), 'dd/MM/yyyy');
        const item = await this.itemqtdRepo.findOne({
            where: {
                Item: dto.item,
                status: 'S'
            }
        })
        if (!item) throw new NotFoundException('item nao achado ou nao esta ativo');
        const savedData = await this.repo.findOne({
            where: {
                item: item,
                serverTime: today
            }
        })
        if (!savedData)
            return this.repo.save(
                new BufferHistoricoBuilder().
                    capturaData().
                    comItem(item).
                    comQtdBuffer(dto.qtd)
                    .build()
            )

        savedData.buffer = dto.qtd
        console.log(savedData)
        return this.repo.save(savedData);
    }
}