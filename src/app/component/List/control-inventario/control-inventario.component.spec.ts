import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlInventarioComponent } from './control-inventario.component';

describe('ControlInventarioComponent', () => {
  let component: ControlInventarioComponent;
  let fixture: ComponentFixture<ControlInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
