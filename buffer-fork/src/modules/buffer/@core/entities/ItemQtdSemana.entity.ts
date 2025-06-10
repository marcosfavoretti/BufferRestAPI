import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { BufferHistorico } from "./BufferHistorico.entity";

// @Entity({ name: 'ETHOS_MET_NCSSP4.dbo.item_x_qtdsemana', synchronize: false })
@Entity({ name: 'item_x_qtdsemana', synchronize: false })
export class ItemQtdSemana {
    @PrimaryColumn({default: 'MODELO'})
    public Item: string; // Armazena como string no banco

    @Column('varchar')
    public tipo_item: string;

    @Column('char')
    public status: 'S' | 'N';

    @OneToMany(() => BufferHistorico, bufferHistorico => bufferHistorico.item)
    public bufferHistoricos: BufferHistorico[];

    get currentBuffer(): number {
        const todayReport = this.bufferHistoricos?.find(b => b.serverTime.getTime() === new Date().getTime());
        return todayReport?.buffer || 0;
    }
}
