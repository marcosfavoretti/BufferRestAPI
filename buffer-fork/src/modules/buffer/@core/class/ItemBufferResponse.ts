import { ApiProperty } from "@nestjs/swagger";
import { ItemQtdSemana } from "../entities/ItemQtdSemana.entity";
import { Production } from "src/modules/production/@core/entities/Production.entity";

export class ItemBufferResponse {
    @ApiProperty()
    public Item: string; // Armazena como string no banco

    @ApiProperty()
    public tipo_item: string;

    @ApiProperty()
    public currentBuffer: number;

    @ApiProperty()
    public codClient: string;

    constructor(
        itemqtdSemana: ItemQtdSemana,
        production: Production
    ) {
        this.codClient = production? production.getItemCliente()?.Value.trim() : 'NoNe';
        this.Item = itemqtdSemana.Item;
        this.tipo_item = itemqtdSemana.tipo_item;
        this.currentBuffer = itemqtdSemana.currentBuffer;
    }
}