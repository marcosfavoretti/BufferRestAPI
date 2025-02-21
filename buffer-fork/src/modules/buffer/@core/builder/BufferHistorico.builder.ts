import { format } from "date-fns";
import { BufferHistorico } from "../entities/BufferHistorico.entity";
import { ItemQtdSemana } from "../entities/ItemQtdSemana.entity";

export class BufferHistoricoBuilder {
    private bufferHist: BufferHistorico = new BufferHistorico();

    capturaData(): this{
        this.bufferHist.serverTime = format(new Date(), 'dd/MM/yyyy');
        return this;
    }

    comId(id: number): this{
        this.bufferHist.id = id;
        return this;
    }

    comQtdBuffer(qtd: number):this{
        this.bufferHist.buffer = qtd;
        return this;
    }

    comItem(item: ItemQtdSemana):this{
        this.bufferHist.item = item; 
        return this;
    }

    build(): BufferHistorico {
        return this.bufferHist;
    }
}