import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoacademicoListComponent } from './periodoacademico-list.component';

describe('PeriodoacademicoListComponent', () => {
  let component: PeriodoacademicoListComponent;
  let fixture: ComponentFixture<PeriodoacademicoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodoacademicoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodoacademicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
