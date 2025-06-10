import { DataSource, Repository } from "typeorm";
import { MercadosIntermediario } from "../../@core/entities/MercadosIntermediarios.entity";
import { InjectDataSource } from "@nestjs/typeorm";

export class MercadosIntermediarioRepository extends Repository<MercadosIntermediario>{
    constructor(@InjectDataSource()dt:DataSource){
        super(MercadosIntermediario, dt.createEntityManager());        
    }
}