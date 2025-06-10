import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaveBufferInHistUseCase } from "./application/SaveBufferInHist.usecase";
import { ListItensAtivosUseCase } from "./application/ListItensAtivos.usecase";
import { BufferServiceModule } from "./BufferService.module";
import { ConsultaSetoresUseCase } from "./application/ConsultaSetores.usecase";
import { ConsultarMercadoUseCase } from "./application/ConsultaMercados.usecase";

@Module({
    imports: [
        BufferServiceModule
    ],
    providers: [
        SaveBufferInHistUseCase,
        ListItensAtivosUseCase,
        ConsultaSetoresUseCase,
        ConsultarMercadoUseCase,
    ],
    exports: [
        ConsultaSetoresUseCase,
        ConsultarMercadoUseCase,
        ListItensAtivosUseCase,
        SaveBufferInHistUseCase
    ]
})
export class BufferModule { }