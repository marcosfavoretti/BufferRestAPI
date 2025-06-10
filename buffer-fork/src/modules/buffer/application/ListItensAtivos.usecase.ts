import { InjectRepository } from "@nestjs/typeorm";
import { ItemQtdSemana } from "../@core/entities/ItemQtdSemana.entity";
import { Like, Repository } from "typeorm";
import { ItemBufferResponse } from "../@core/class/ItemBufferResponse";
import { Production } from "src/modules/production/@core/entities/Production.entity";
import { Inject } from "@nestjs/common";
import { ItemQtdSemanaRepository } from "../infra/repository/ItemQtdSemana.repository";
import { ProductionRepository } from "src/modules/production/infra/repository/Production.repository";

export class ListItensAtivosUseCase {
    constructor(
        @Inject(ProductionRepository) private productionRepo: Repository<Production>,
        @Inject(ItemQtdSemanaRepository) private itemqtdRepo: Repository<ItemQtdSemana>
    ) { }

    async list(): Promise<ItemBufferResponse[]> {
        const responseItens: Array<ItemBufferResponse> = [];
        const itens = await this.itemqtdRepo.find({
            where: {
                status: 'S',
                Item: Like('%-110-%')
            },
            relations: ['bufferHistoricos'],
        })
        for (const item of itens) {
            const production = await this.productionRepo.findOne({
                where: {
                    PartCode: item.Item
                },
                relations: ['productionData'],
                order: {
                    ProductionID: 'desc'
                }
            });
            responseItens.push(new ItemBufferResponse(item, production));
        }
        return responseItens;
    }
}