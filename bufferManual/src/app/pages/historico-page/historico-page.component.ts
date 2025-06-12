import { Component, OnInit } from '@angular/core';
import { TableDynamicComponent } from '../../widgets/table-dynamic/table-dynamic.component';
import { ContagemHistoricoTabelaComponent } from "../../widgets/contagem-historico-tabela/contagem-historico-tabela.component";

@Component({
  selector: 'app-historico-page',
  imports: [
    ContagemHistoricoTabelaComponent
],
  templateUrl: './historico-page.component.html',
  styleUrl: './historico-page.component.css'
})
export class HistoricoPageComponent implements OnInit {
  ngOnInit(): void {

  }
}
