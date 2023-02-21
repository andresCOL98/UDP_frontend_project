import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoacademicoEditComponent } from './periodoacademico-edit.component';

describe('PeriodoacademicoEditComponent', () => {
  let component: PeriodoacademicoEditComponent;
  let fixture: ComponentFixture<PeriodoacademicoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodoacademicoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodoacademicoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
