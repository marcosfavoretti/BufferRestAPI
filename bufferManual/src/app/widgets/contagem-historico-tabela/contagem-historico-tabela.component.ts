import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../../service/Api.service';
import { LoadingPopupService } from '../../service/LoadingPopup.service';
import { format, subDays } from 'date-fns';
import { TableDynamicComponent } from "../table-dynamic/table-dynamic.component";
import { TableModel } from '../table-dynamic/@core/table.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-contagem-historico-tabela',
  imports: [TableDynamicComponent, AsyncPipe],
  templateUrl: './contagem-historico-tabela.component.html',
  styleUrl: './contagem-historico-tabela.component.css'
})
export class ContagemHistoricoTabelaComponent implements OnInit {
  constructor(
    @Inject(ApiService) private api: ApiService,
    @Inject(LoadingPopupService) private popup: LoadingPopupService
  ) { }
  private readonly today = new Date();
  defaultDate = {
    start: subDays(this.today, 2),
    end: this.today
  }
  shema: TableModel = {
    title: `Histórico de contagens (${format(this.defaultDate.start, 'dd/MM/yyyy')}~${format(this.defaultDate.end, 'dd/MM/yyyy')})`,
    totalize: false,
    paginator: true,
    columns: [
      {
        isDate: true,
        alias: 'Data/Hora do Servidor',
        field: 'serverTime',
      },
      {
        alias: 'Item',
        field: 'Item',
      },
      {
        alias: 'Tipo de Item',
        field: 'tipo_item',
      },
      {
        alias: 'Corredor de Solda',
        field: 'CORREDOR DE SOLDA',
      },
      {
        alias: 'Lixa',
        field: 'LIXA',
      },
      {
        alias: 'Banho',
        field: 'BANHO',
      },
      {
        alias: 'Montagem',
        field: 'MONTAGEM',
      },
      {
        alias: 'Linha de Montagem',
        field: 'LINHA DE MONTAGEM',
      },
      {
        alias: 'Liberada',
        field: 'LIBERADA',
      },
      {
        alias: 'Retrabalho S/ Porta',
        field: 'RETRABALHO S/ PORTA',
      },
      {
        alias: 'Retrabalho Montagem',
        field: 'RETRABALHO MONTAGEM',
      },
      {
        alias: 'Retrabalho Solda',
        field: 'RETRABALHO SOLDA',
      },
      {
        alias: 'Retrabalho Pintura',
        field: 'RETRABALHO PINTURA',
      },
      {
        alias: 'Inspeção',
        field: 'INSPEÇÃO',
      }
    ]
  }

  data: any[] = []; // Dados que serão exibidos na tabela
  totalRecords: number = 0;   // Total de registros para paginação
  loading: boolean = false;
  lazy$: any;
  hist$!: Observable<any>;

  ngOnInit(): void {
    this.loadHistoricoData();
  }

  loadHistoricoData() {
    this.hist$ = this.api.requestHistorico(this.defaultDate.start, this.defaultDate.end)
    if (this.popup) {
      this.popup.showWhile(this.hist$);
    }
  }
}
