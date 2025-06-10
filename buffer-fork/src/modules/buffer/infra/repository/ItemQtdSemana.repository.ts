import { DataSource, Repository } from "typeorm";
import { ItemQtdSemana } from "../../@core/entities/ItemQtdSemana.entity";
import { InjectDataSource } from "@nestjs/typeorm";

export class ItemQtdSemanaRepository extends Repository<ItemQtdSemana>{
    constructor(@InjectDataSource() dt: DataSource){
        super(ItemQtdSemana, dt.createEntityManager());
    }
}