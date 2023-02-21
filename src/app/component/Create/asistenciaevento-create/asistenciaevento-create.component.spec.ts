import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaeventoCreateComponent } from './asistenciaevento-create.component';

describe('AsistenciaeventoCreateComponent', () => {
  let component: AsistenciaeventoCreateComponent;
  let fixture: ComponentFixture<AsistenciaeventoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciaeventoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciaeventoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
