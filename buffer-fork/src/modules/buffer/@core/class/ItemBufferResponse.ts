import { ItemQtdSemana } from "../entities/ItemQtdSemana.entity";
import { Production } from "src/modules/production/@core/entities/Production.entity";

export class ItemBufferResponse {
    public Item: string; // Armazena como string no banco

    public tipo_item: string;

    public currentBuffer: number;

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