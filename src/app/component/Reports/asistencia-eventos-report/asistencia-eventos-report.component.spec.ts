import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaEventosReportComponent } from './asistencia-eventos-report.component';

describe('AsistenciaEventosReportComponent', () => {
  let component: AsistenciaEventosReportComponent;
  let fixture: ComponentFixture<AsistenciaEventosReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciaEventosReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciaEventosReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
