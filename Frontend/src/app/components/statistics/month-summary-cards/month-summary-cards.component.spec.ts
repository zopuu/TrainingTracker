import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthSummaryCardsComponent } from './month-summary-cards.component';

describe('MonthSummaryCardsComponent', () => {
  let component: MonthSummaryCardsComponent;
  let fixture: ComponentFixture<MonthSummaryCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthSummaryCardsComponent]
    });
    fixture = TestBed.createComponent(MonthSummaryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
