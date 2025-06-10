import { Like } from "typeorm";
import { ItemQtdSemana } from "../../@core/entities/ItemQtdSemana.entity";
import { ItemQtdSemanaRepository } from "../repository/ItemQtdSemana.repository";
import { Inject } from "@nestjs/common";
import { ProblemaConsultandoItemException } from "../../exception/ProblemaConsultandoItem.exception";

export class ConsutlarItensAtivosService {
    constructor(@Inject(ItemQtdSemanaRepository) private itemQtdRepo: ItemQtdSemanaRepository) { }

    async itensAtivos110(): Promise<ItemQtdSemana[]> {
        try {
            return await this.itemQtdRepo.find({
                where: {
                    Item: Like('%-110-%'),
                    status: 'S'
                }
            });
        } catch (error) {
            console.error(error)
            throw new ProblemaConsultandoItemException();
        }
    }
    async itensAtivos000(): Promise<ItemQtdSemana[]> {
        try {
            return await this.itemQtdRepo.find({
                where: {
                    Item: Like('%-000-%'),
                    status: 'S'
                }
            });
        } catch (error) {
            console.error(error)
            throw new ProblemaConsultandoItemException();
        }
    }
    async itensAtivosTodos(): Promise<ItemQtdSemana[]> {
        try {
            return await this.itemQtdRepo.find({
                where: {
                    status: 'S'
                }
            });
        } catch (error) {
            console.error(error)
            throw new ProblemaConsultandoItemException();
        }
    }
}