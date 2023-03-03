import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoParticipacionCreateComponent } from './evento-participacion-create.component';

describe('EventoParticipacionCreateComponent', () => {
  let component: EventoParticipacionCreateComponent;
  let fixture: ComponentFixture<EventoParticipacionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoParticipacionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoParticipacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
