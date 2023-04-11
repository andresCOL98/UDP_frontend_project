import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaCategoriaReportComponent } from './asistencia-categoria-report.component';

describe('AsistenciaCategoriaReportComponent', () => {
  let component: AsistenciaCategoriaReportComponent;
  let fixture: ComponentFixture<AsistenciaCategoriaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciaCategoriaReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciaCategoriaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
