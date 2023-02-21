import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCreateComponent } from './reporte-create.component';

describe('ReporteCreateComponent', () => {
  let component: ReporteCreateComponent;
  let fixture: ComponentFixture<ReporteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
