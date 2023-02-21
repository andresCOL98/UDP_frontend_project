import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoacademicoCreateComponent } from './periodoacademico-create.component';

describe('PeriodoacademicoCreateComponent', () => {
  let component: PeriodoacademicoCreateComponent;
  let fixture: ComponentFixture<PeriodoacademicoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodoacademicoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodoacademicoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
