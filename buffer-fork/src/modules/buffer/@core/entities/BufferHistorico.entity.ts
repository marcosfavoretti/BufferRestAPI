import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ItemQtdSemana } from "./ItemQtdSemana.entity";
import { Exclude, Expose } from "class-transformer";

@Entity({ name: 'ETHOS_MET_NCSSP4.dbo.buffer_historico' })
export class BufferHistorico {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar')
    public serverTime: string;
    
    @Column('int')
    public buffer: number;

    @Exclude()
    @ManyToOne(() => ItemQtdSemana, itemQtdSemana => itemQtdSemana.bufferHistoricos)
    @JoinColumn({name: 'item'})
    public item: ItemQtdSemana;
}