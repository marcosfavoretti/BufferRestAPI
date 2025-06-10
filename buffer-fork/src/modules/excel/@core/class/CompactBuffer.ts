export interface CompactBuffer {
    item: string
    serverTime: string | number,
    tipo_item: string,
    ItemFiho:string,
    [mercados: string]: number | string;
}