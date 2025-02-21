import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductionData } from "./ProductionData.entity";
import { TypeData } from "../enum/TypeData.enum";

@Entity({ name: 'Production' })
export class Production {
    @PrimaryGeneratedColumn('increment')
    public ProductionID: number;
    @Column('varchar')
    public OrderNum: string;
    @Column('varchar')
    public PartCode: string;
    @Column('varchar')
    public PartName: string;
    @Column('int')
    public PlanQty: number;
    @Column('datetime')
    public PlannedEndTimestamp: Date;
    @OneToMany(() => ProductionData, (prodData) => prodData.production, { cascade: ['update'] })
    public productionData: ProductionData[];

    getPedido(): ProductionData {
        return this.productionData.find(p => p.TypeDataID === TypeData.PEDIDO);
    }
    getPrefixo(): ProductionData {
        return this.productionData.find(p => p.TypeDataID === TypeData.PREFIXO);
    }
    getItemCliente(): ProductionData {
        return this.productionData.find(p => p.TypeDataID === TypeData.ITEM_CLIENTE);
    }
    getTipagemStatus(): ProductionData {
        return this.productionData.find(p => p.TypeDataID === TypeData.TIPAGEM_STT);
    }
    getCliente(): ProductionData {
        return this.productionData.find(p => p.TypeDataID === TypeData.CLIENTE);
    }
    getPedidoCli(): ProductionData {
        return this.productionData.find(p => p.TypeDataID === TypeData.PEDIDO_CLI);
    }
}