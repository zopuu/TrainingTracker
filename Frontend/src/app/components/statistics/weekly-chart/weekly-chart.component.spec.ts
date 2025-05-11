import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyChartComponent } from './weekly-chart.component';

describe('WeeklyChartComponent', () => {
  let component: WeeklyChartComponent;
  let fixture: ComponentFixture<WeeklyChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyChartComponent]
    });
    fixture = TestBed.createComponent(WeeklyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
