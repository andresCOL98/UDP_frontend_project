import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEventosComponent } from './dialogo-eventos.component';

describe('DialogoEventosComponent', () => {
  let component: DialogoEventosComponent;
  let fixture: ComponentFixture<DialogoEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoEventosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
