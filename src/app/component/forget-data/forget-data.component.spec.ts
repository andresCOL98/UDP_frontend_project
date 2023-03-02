import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetDataComponent } from './forget-data.component';

describe('ForgetDataComponent', () => {
  let component: ForgetDataComponent;
  let fixture: ComponentFixture<ForgetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
