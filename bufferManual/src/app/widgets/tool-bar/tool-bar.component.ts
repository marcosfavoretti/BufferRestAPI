import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { ApiService } from '../../service/Api.service';
import { LoadingPopupService } from '../../service/LoadingPopup.service';

@Component({
  selector: 'app-tool-bar',
  imports: [TooltipModule],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent {
  constructor(private router: Router, private api: ApiService, private popUp: LoadingPopupService) { }

  gotoDash(): void {
    this.router.navigate(['/dash']);
  }

  syncExcel(): void {
    const excel$ = this.api.syncExcel();
    this.popUp.showWhile(excel$);
  }

}
