import { TableModel } from "../../../@core/models/components/table.model";
import {format} from 'date-fns';
export const homeTable : TableModel = {
    title: `Cadastro Buffer Manual do dia ${format(new Date(), 'dd/MM/yyyy')}`,
    totalize: false,
    columns: [
        {
            alias: 'Image',
            path: 'Item',
            isImg: true
        },
        {
            alias: 'Cod Cliente',
            path: 'codClient'
        },
        {
            alias: 'Item',
            path: 'Item',
        },
        {
            alias: 'Desc',
            path: 'tipo_item',
        },
        {
            alias: 'Buffer',
            path: 'currentBuffer',
            isCheckBox: true
        }
    ],
    ghostControll: []
}