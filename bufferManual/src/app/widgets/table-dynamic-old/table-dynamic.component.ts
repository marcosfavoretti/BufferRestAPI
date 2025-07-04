import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { FormsModule } from '@angular/forms';
import { tableColumns, TableModel } from '../table-dynamic/@core/table.model';


@Component({
  standalone: true,
  selector: 'app-table-dynamic',
  templateUrl: './table-dynamic.component.html',
  styleUrls: ['./table-dynamic.component.css'],
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    ImageModule,
  ]
})
export class TableDynamicComponent implements OnChanges {
  @Input() data: any[] = []; // O array de objetos a ser exibido na tabela
  @Input() tableModel!: TableModel
  @Output('OnChecked') onChecked: EventEmitter<{ row: any, column: any, checked: number }> = new EventEmitter();
  @Input() Externalfilter?: { value: string, filed: string, method: 'contains' };
  // Função auxiliar
  @ViewChild('dt2') dt2!: Table
  Array = Array;
  Object = Object;
  search(table: Table, event: any): void {
    table.filterGlobal((event.target as HTMLInputElement).value.trim(), 'contains');
  }
  onNewCheckEvent(row: any, column: any, event: any): void {
    console.log(row, column, event)
    const oldValue = this.getNestedValue(row, column.field);
    this.setNestedValue(row, column.field, event.target.value)
    this.onChecked.emit({
      row: row,
      column: column,
      checked: +event.target.value
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tableModel.totalize === true) this.data.map(data => data.atr_group = 'GROUP');
    if (this.Object.hasOwn(changes, 'filter') && changes['filter'].currentValue) {
      this.filterTable(changes['filter'].currentValue as { value: string, field: string, method: 'contains' | 'notEquals' });
    }
  }
  getTotalOfColumn(column: tableColumns): number | undefined {
    // Verificar se os dados existem e são um array de objetos
    if (!column.toTotalize) return;
    return this.data.reduce((total, item) => {
      const [targetItens] = this.getNestedValue(item, column.field);
      const value = Number(targetItens);
      if (!isNaN(value)) {
        return total + value;
      }
      return Number(total).toFixed(2); // Ignorar se não for número
    }, 0);
  }
  getAllColumns(): string[] {
    const ocultColumns = this.tableModel?.ghostControll?.map(col => col.field);
    const visibleColumns = this.tableModel.columns?.map(col => col.field);
    if (ocultColumns && ocultColumns?.length > 1) {
      visibleColumns!.push(...ocultColumns)
    }
    return visibleColumns!;
  }


  getNestedValue(object: any, key: any): any {
    const result = key.split('.').reduce((acc: any, curr: any) => {
      if (Array.isArray(acc)) {
        return acc.map(item => {
          if (Array.isArray(item)) {
            return item[0][curr]
          }
          else {
            return item[curr];
          }
        });
      }
      return acc ? acc[curr] : null;
    }, object);
    return result;
  }

  setNestedValue(object: any, key: any, newValue: any): void {
    const result = key.split('.').reduce((acc: any, curr: any) => {
      if (Array.isArray(acc)) {
        return acc.map(item => {
          if (Array.isArray(item)) {
            return item[0][curr]
          }
          else {
            return item[curr];
          }
        });
      }
      return acc ? acc[curr] = newValue : null;
    }, object);
    return result;
  }

  checkHighLight(data: any): { [key: string]: string } | undefined {
    if (!this.tableModel.ghostControll) return undefined;
    for (const controll of this.tableModel.ghostControll) {
      const value = this.getNestedValue(data, controll.field);
      if (String(controll.ifValueEqual) === String(value)) {
        return { 'background-color': controll.color };
      }
    }
    return undefined;
  }
  getTotalizeColumns() {
    return this.tableModel.columns?.filter(column => column.toTotalize);
  }

  filterTable(payload: { value: string, field: string, method: 'contains' | 'notEquals' }): void {
    const { value, field, method } = payload;
    this.dt2.filter(value, field, method);
  }

  clearFilter(): void {
    this.dt2.clear()
    this.dt2.reset()
  }
}
