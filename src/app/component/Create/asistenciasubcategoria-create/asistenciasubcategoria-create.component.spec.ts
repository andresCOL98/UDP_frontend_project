import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasubcategoriaCreateComponent } from './asistenciasubcategoria-create.component';

describe('AsistenciasubcategoriaCreateComponent', () => {
  let component: AsistenciasubcategoriaCreateComponent;
  let fixture: ComponentFixture<AsistenciasubcategoriaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciasubcategoriaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciasubcategoriaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
