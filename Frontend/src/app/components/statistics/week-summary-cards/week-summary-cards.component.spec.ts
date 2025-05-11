import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekSummaryCardsComponent } from './week-summary-cards.component';

describe('WeekSummaryCardsComponent', () => {
  let component: WeekSummaryCardsComponent;
  let fixture: ComponentFixture<WeekSummaryCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeekSummaryCardsComponent]
    });
    fixture = TestBed.createComponent(WeekSummaryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
