import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciamedicaListComponent } from './asistenciamedica-list.component';

describe('AsistenciamedicaListComponent', () => {
  let component: AsistenciamedicaListComponent;
  let fixture: ComponentFixture<AsistenciamedicaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciamedicaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciamedicaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
