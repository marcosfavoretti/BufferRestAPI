import { Controller, Get, Inject } from "@nestjs/common";
import { ItemBufferResponse } from "src/modules/buffer/@core/class/ItemBufferResponse";
import { ListItensAtivosUseCase } from "src/modules/buffer/application/ListItensAtivos.usecase";

@Controller('/item')
export class ItemQtdSemanaController {
    @Inject(ListItensAtivosUseCase) private listItensUseCase: ListItensAtivosUseCase;
    @Get('/')
    async listItens():Promise<ItemBufferResponse[]>{
        return this.listItensUseCase.list();        
    }
}