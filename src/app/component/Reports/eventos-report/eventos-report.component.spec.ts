import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosReportComponent } from './eventos-report.component';

describe('EventosReportComponent', () => {
  let component: EventosReportComponent;
  let fixture: ComponentFixture<EventosReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
