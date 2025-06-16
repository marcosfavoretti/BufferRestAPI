import { Component, OnInit } from '@angular/core';
import { LoadingPopupService } from '../../service/LoadingPopup.service';
import { ApiService } from '../../service/Api.service';
import { SetorStoreService } from '../../service/SetorStore.service';
import { TableModel } from '../table-dynamic/@core/table.model';
import { format } from 'date-fns';
import { ResMercadosIntermediarioDoSetorDTO } from '../../../api';
import { tap } from 'rxjs';
import { BufferTable } from '../../@core/models/component/BufferTable';
import { TableDynamicComponent } from "../table-dynamic/table-dynamic.component";

@Component({
  selector: 'app-setores-tables',
  imports: [TableDynamicComponent],
  templateUrl: './setores-tables.component.html',
  styleUrl: './setores-tables.component.css'
})
export class SetoresTablesComponent implements OnInit {

  constructor(
    private popupservice: LoadingPopupService,
    private apiService: ApiService,
    private setorStore: SetorStoreService
  ) { }

  tableSchema!: TableModel;
  data2Display: any[] = []
  colunasAdicionais: string[] = [];

  updateRequire(event: any): void {
    if (event.row[event.column] == undefined) {
      return;
    }
    const update$ = this.apiService.saveLog({
      item: event.row.item,
      qtd: event.row[event.column],
      mercadoName: event.column
    })
    this.popupservice.showWhile(update$);
  }

  ngOnInit(): void {
    this.setorStore.currentSetor$.subscribe(
      update => {
        this.refreshTable();
      }
    )
  }

  pegarMercadosDinamicos(res: ResMercadosIntermediarioDoSetorDTO[]) {
    const result = [];
    this.colunasAdicionais = res.map(p => p.nome);
    const itensUnicos = Array.from(
      new Map(
        res
          .flatMap(r2 => r2.histBuffer)
          .filter(i => i.item && i.item.Item) // garante que existe i.item e i.item.item
          .map(i => [i.item.Item, i.item]) // usa i.item.item como chave, i.item como valor
      ).values()
    );
    for (const item of itensUnicos) {
      const resultObj: BufferTable = {
        apelido: item.tipo_item,
        image: item.Item,
        item: item.Item,
        itemCliente: item.item_cliente
      };
      for (const mercado of res) {
        const bufferObj = mercado.histBuffer.find(p => p.item.Item === item.Item);
        resultObj[mercado.nome] = bufferObj ? bufferObj.buffer : 0;
      }
      result.push(resultObj);
    }
    this.data2Display = result;
  }

  refreshTable(): void {
    if (!this.setorStore.currentSetor) {
      console.error("Setor atual não definid no momento da requisição. Abortando.");
      return;
    }
    console.log(`Iniciando requisição para o setor: ${this.setorStore.currentSetor.idSetor}`);
    const resolution = this.apiService.requestMercadoInfo(this.setorStore.currentSetor.idSetor, format(new Date(), 'dd-MM-yyyy'))
      .pipe(
        tap(
          data => {
            this.pegarMercadosDinamicos(data);
            this.tableRefresh();
          }
        )
      );
    this.popupservice.showWhile(resolution);
  }

  tableRefresh(): void {
    this.tableSchema = {
      title: `${this.setorStore.currentSetor?.setor} no dia ${format(new Date(), 'dd/MM/yyyy')}`,
      totalize: false,
      columns: [
        {
          alias: 'Image',
          field: 'item',
          isImg: true
        },
        {
          alias: 'Item',
          field: 'item',
        },
        {
          alias: 'apelido',
          field: 'apelido'
        },
        {
          alias: 'Item Cliente',
          field: 'itemCliente',
        },
      ],
      ghostControll: []
    };
    console.log('a+', this.colunasAdicionais)
    this.colunasAdicionais.forEach(c => this.tableSchema.columns.push({
      alias: c,
      field: c,
      isInputText: true
    }));
  }

}
