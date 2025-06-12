import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from "primeng/toast"
import { SetoresDirComponent } from "../../widgets/setores-dir/setores-dir.component";
import { SetoresTablesComponent } from "../../widgets/setores-tables/setores-tables.component";
import { ToolBarComponent } from "../../widgets/tool-bar/tool-bar.component";
@Component({
  selector: 'app-home-page',
  providers: [MessageService],
  imports: [ToastModule, SetoresDirComponent, SetoresTablesComponent, ToolBarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
}
