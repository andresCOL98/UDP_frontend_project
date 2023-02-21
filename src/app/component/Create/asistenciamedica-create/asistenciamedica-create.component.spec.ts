import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciamedicaCreateComponent } from './asistenciamedica-create.component';

describe('AsistenciamedicaCreateComponent', () => {
  let component: AsistenciamedicaCreateComponent;
  let fixture: ComponentFixture<AsistenciamedicaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciamedicaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciamedicaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
