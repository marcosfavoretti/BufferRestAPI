import { BufferHistoricoBuilder } from "src/modules/buffer/@core/builder/BufferHistorico.builder";
import { ItemQtdSemana } from "src/modules/buffer/@core/entities/ItemQtdSemana.entity"

describe('test of itemqtdSemana', () => {
    let item: ItemQtdSemana;

    beforeAll(() => {
        const buffer1 = new BufferHistoricoBuilder().capturaData().comQtdBuffer(5).comId(10).build();
        const buffer2 = new BufferHistoricoBuilder().capturaData().comQtdBuffer(10).comId(5).build();
        const buffer3 = new BufferHistoricoBuilder().capturaData().comQtdBuffer(5).comId(20).build();
        const buffer4 = new BufferHistoricoBuilder().capturaData().comQtdBuffer(100).comId(100).build();
        item = new ItemQtdSemana();
        item.bufferHistoricos = [
            buffer4,
            buffer1,
            buffer2,
            buffer3,
        ];
        item.status = 'S';
        item.tipo_item = 'teste do item';
    })
    it('should return the older buffer value', () => {
        expect(item.currentBuffer).toBe(100);
    })

    it('should return 0 when the historic is empty', () => {
        item.bufferHistoricos = [];
        expect(item.currentBuffer).toBe(0);
    })
})