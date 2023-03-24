import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionDialogoComponent } from './notificacion-dialogo.component';

describe('NotificacionDialogoComponent', () => {
  let component: NotificacionDialogoComponent;
  let fixture: ComponentFixture<NotificacionDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificacionDialogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
