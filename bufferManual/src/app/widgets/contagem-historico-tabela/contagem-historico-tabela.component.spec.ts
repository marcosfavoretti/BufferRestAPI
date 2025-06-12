import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContagemHistoricoTabelaComponent } from './contagem-historico-tabela.component';

describe('ContagemHistoricoTabelaComponent', () => {
  let component: ContagemHistoricoTabelaComponent;
  let fixture: ComponentFixture<ContagemHistoricoTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContagemHistoricoTabelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContagemHistoricoTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
