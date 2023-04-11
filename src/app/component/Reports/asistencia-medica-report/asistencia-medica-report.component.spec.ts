import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaMedicaReportComponent } from './asistencia-medica-report.component';

describe('AsistenciaMedicaReportComponent', () => {
  let component: AsistenciaMedicaReportComponent;
  let fixture: ComponentFixture<AsistenciaMedicaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciaMedicaReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciaMedicaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
