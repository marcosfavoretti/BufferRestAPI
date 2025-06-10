import { DataSource, Repository } from "typeorm";
import { BufferHistorico } from "../../@core/entities/BufferHistorico.entity";
import { InjectDataSource } from "@nestjs/typeorm";

export class BufferHistoricoRepository extends Repository<BufferHistorico>{
    constructor(@InjectDataSource()dt:DataSource) {
        super(BufferHistorico, dt.createEntityManager());
    }
}