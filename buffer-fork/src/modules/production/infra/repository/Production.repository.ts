import { DataSource, Repository } from "typeorm";
import { Production } from "../../@core/entities/Production.entity";
import { InjectDataSource } from "@nestjs/typeorm";

export class ProductionRepository extends Repository<Production>{
    constructor(@InjectDataSource()dt:DataSource){
        super(Production, dt.createEntityManager());
    }
}