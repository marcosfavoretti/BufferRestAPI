import { DataSource, Repository } from "typeorm";
import { Setores } from "../../@core/entities/Setores.entity";
import { InjectDataSource } from "@nestjs/typeorm";

export class SetoresRepository extends Repository<Setores>{
    constructor(@InjectDataSource()dt:DataSource){
        super(Setores, dt.createEntityManager())
    }
}