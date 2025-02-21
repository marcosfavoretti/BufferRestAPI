import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { BufferHistorico } from "./BufferHistorico.entity";
import * as _ from "lodash"
import { Exclude, Expose } from "class-transformer";
import { format } from "date-fns";

@Entity({ name: 'ETHOS_MET_NCSSP4.dbo.item_x_qtdsemana' })
export class ItemQtdSemana {
    @PrimaryColumn()
    public Item: string; // Armazena como string no banco

    @Column('varchar')
    public tipo_item: string;

    @Column('char')
    public status: 'S' | 'N'

    @OneToMany(() => BufferHistorico, bufferHistorico => bufferHistorico.item)
    public bufferHistoricos: BufferHistorico[];

    //metodo que pega o ultimo registro do array
    get currentBuffer(): number {
        const today = format(new Date(), 'dd/MM/yyyy');
        const todayReport = this.bufferHistoricos?.find(b => b.serverTime === today);
        return todayReport?.buffer || 0;
    }
}
