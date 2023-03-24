import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoInformeCreateComponent } from './evento-informe-create.component';

describe('EventoInformeCreateComponent', () => {
  let component: EventoInformeCreateComponent;
  let fixture: ComponentFixture<EventoInformeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoInformeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoInformeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
