import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemQtdSemana } from "./@core/entities/ItemQtdSemana.entity";
import { BufferHistorico } from "./@core/entities/BufferHistorico.entity";
import { Production } from "../production/@core/entities/Production.entity";
import { ItemQtdSemanaRepository } from "./infra/repository/ItemQtdSemana.repository";
import { BufferHistoricoRepository } from "./infra/repository/BufferHistorico.repository";
import { ConsutlarItensAtivosService } from "./infra/service/ConsultarItensAtivos.service";
import { GerenciaBuffersService } from "./infra/service/GerenciaBuffers.service";
import { ProductionRepository } from "../production/infra/repository/Production.repository";
import { ConsultaSetoresService } from "./infra/service/ConsultaSetores.service";
import { ConsultaMercadoService } from "./infra/service/ConsultarMercado.service";
import { Setores } from "./@core/entities/Setores.entity";
import { SetoresRepository } from "./infra/repository/Setores.repository";
import { MercadosIntermediarioRepository } from "./infra/repository/MercadosIntermediario.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ItemQtdSemana,
            BufferHistorico,
            Production,
        ])
    ],
    providers: [
        SetoresRepository,
        MercadosIntermediarioRepository,
        ConsultaSetoresService,
        ConsultaMercadoService,
        BufferHistoricoRepository,
        ItemQtdSemanaRepository,
        ConsutlarItensAtivosService,
        GerenciaBuffersService,
        ProductionRepository,
    ],
    exports: [
        ConsultaSetoresService,
        ConsultaMercadoService,
        ProductionRepository,
        ConsutlarItensAtivosService,
        GerenciaBuffersService,
        BufferHistoricoRepository,
        ItemQtdSemanaRepository,
    ]
})
export class BufferServiceModule { }