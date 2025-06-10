import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ItemQtdSemana } from "./ItemQtdSemana.entity";
import { Exclude, Expose } from "class-transformer";
import { MercadosIntermediario } from "./MercadosIntermediarios.entity";

// @Entity({ name: 'ETHOS_MET_NCSSP4.dbo.buffer_historico' })
@Entity({ name: 'buffer_historico' })
export class BufferHistorico {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('datetime')
    serverTime: Date;
    
    @Column('int')
    buffer: number;

    @Exclude()
    @ManyToOne(() => ItemQtdSemana, itemQtdSemana => itemQtdSemana.bufferHistoricos)
    @JoinColumn({name: 'Item'})
    item: ItemQtdSemana;

    @ManyToOne(() => MercadosIntermediario, mercadosIntermediario => mercadosIntermediario.idMercadosIntermediario)
    mercado: MercadosIntermediario;
}