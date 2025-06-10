import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/Api.service';
import { LoadingPopupService } from '../../service/LoadingPopup.service';
import { Observable } from 'rxjs';
import { ResSetorDTO } from '../../../api';
import { AsyncPipe } from '@angular/common';
import { SetorStoreService } from '../../service/SetorStore.service';

@Component({
  selector: 'app-setores-dir',
  imports: [AsyncPipe],
  templateUrl: './setores-dir.component.html',
  styleUrl: './setores-dir.component.css'
})
export class SetoresDirComponent implements OnInit {
  constructor(private api: ApiService, private popupService: LoadingPopupService, public setorStore: SetorStoreService) { }

  setores$ !: Observable<ResSetorDTO[]>;

  ngOnInit(): void {
    this.setores$ = this.api.requestSetores()
    this.popupService.showWhile(this.setores$);
  }


  setSetor(setor: ResSetorDTO):void{
    this.setorStore.currentSetor = setor;
  }
}
