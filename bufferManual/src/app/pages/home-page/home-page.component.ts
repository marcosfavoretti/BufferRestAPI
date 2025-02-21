import { Component, OnInit } from '@angular/core';
import { TableDynamicComponent } from "../../widgets/table-dynamic/table-dynamic.component";
import { homeTable } from './const/table-schema';
import { ApiService } from '../../service/Api.service';
import { Item } from '../../@core/models/res/Item';
import { SaveBufferHistDto } from '../../@core/models/req/SaveBufferHistDto';
import { MessageService } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';
import {ToastModule} from "primeng/toast"
@Component({
  selector: 'app-home-page',
  providers: [MessageService],
  imports: [TableDynamicComponent, ToastModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  tableSchema = homeTable;
  displayData: Item[] = [];
  constructor(private api: ApiService, private messageService: MessageService) { }

  async ngOnInit(): Promise<void> {
    this.api.requestItem()
      .subscribe(
        data => this.displayData = data
      )
  }

  handleChange(event: any): void {
    console.log(event);
    const payload: SaveBufferHistDto = {
      item: event.row.Item,
      qtd: event.checked
    }
    this.api.saveLog(payload)
      .pipe(
        tap(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Salvo', detail: 'Mudança feita', life: 3000 })
            console.log('feito')
          }
        ),
        catchError(
          (err) => {
            this.messageService.add({ severity: 'danger', summary: 'Erro', detail: 'Houve um erro na hora de salvar', life: 3000 })
            console.error(err);
            return of();
          }
        )
      ).subscribe();
  }

}
