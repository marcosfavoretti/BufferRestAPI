import { Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { ConsultaSetoresUseCase } from "src/modules/buffer/application/ConsultaSetores.usecase";
import { ResSetorDTO } from "./dto/ResSetores.dto";
import { ResMercadosIntermediarioDoSetorDTO } from "./dto/ResMercadosDoSetor.dto";
import { ConsultarMercadoUseCase } from "src/modules/buffer/application/ConsultaMercados.usecase";
@Controller('/setores')
export class SetoresController {
    @Inject(ConsultaSetoresUseCase) setoresUseCase: ConsultaSetoresUseCase
    @ApiResponse({
        type: () => ResSetorDTO,
        isArray: true
    })
    @Get('/')
    async getSetoresMethod(): Promise<ResSetorDTO[]> {
        return await this.setoresUseCase.consultaTodos();
    }

    @Inject(ConsultarMercadoUseCase) private consultarMercadoUseCase: ConsultarMercadoUseCase;
    @ApiResponse({
        type: () => ResMercadosIntermediarioDoSetorDTO,
        isArray: true
    })
    @Get('/:setorId/mercados/:dia')
    async getSetorMercadoMethod(@Param('setorId') setorId: number, @Param('dia') dia: string): Promise<ResMercadosIntermediarioDoSetorDTO[]> {
        return await this.consultarMercadoUseCase.consulta({ dia, setorId })
    }
}