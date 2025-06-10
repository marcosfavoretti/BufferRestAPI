import { Component, OnInit } from '@angular/core';
import { TableDynamicComponent } from "../../widgets/table-dynamic/table-dynamic.component";
import { ApiService } from '../../service/Api.service';
import { Item } from '../../@core/models/res/Item';
import { MessageService } from 'primeng/api';
import { ToastModule } from "primeng/toast"
import { format } from 'date-fns'
import { SetoresDirComponent } from "../../widgets/setores-dir/setores-dir.component";
import { SetoresTablesComponent } from "../../widgets/setores-tables/setores-tables.component";
@Component({
  selector: 'app-home-page',
  providers: [MessageService],
  imports: [ToastModule, SetoresDirComponent, SetoresTablesComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
}
