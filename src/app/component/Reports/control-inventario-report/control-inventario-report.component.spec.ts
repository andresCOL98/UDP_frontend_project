import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlInventarioReportComponent } from './control-inventario-report.component';

describe('ControlInventarioReportComponent', () => {
  let component: ControlInventarioReportComponent;
  let fixture: ComponentFixture<ControlInventarioReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlInventarioReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlInventarioReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
