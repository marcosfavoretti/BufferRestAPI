import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemQtdSemana } from "./@core/entities/ItemQtdSemana.entity";
import { SaveBufferInHistUseCase } from "./application/SaveBufferInHist.usecase";
import { BufferHistorico } from "./@core/entities/BufferHistorico.entity";
import { ListItensAtivosUseCase } from "./application/ListItensAtivos.usecase";
import { Production } from "../production/@core/entities/Production.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ItemQtdSemana,
            BufferHistorico,
            Production
        ])
    ],
    providers: [
        SaveBufferInHistUseCase,
        ListItensAtivosUseCase
    ],
    exports: [
        ListItensAtivosUseCase,
        SaveBufferInHistUseCase
    ]
})
export class BufferModule { }