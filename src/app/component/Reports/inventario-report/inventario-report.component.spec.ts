import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioReportComponent } from './inventario-report.component';

describe('InventarioReportComponent', () => {
  let component: InventarioReportComponent;
  let fixture: ComponentFixture<InventarioReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
