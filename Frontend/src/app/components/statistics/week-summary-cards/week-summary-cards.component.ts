import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeekStats } from 'src/app/services/training.service';

@Component({
  selector: 'app-week-summary-cards',
  templateUrl: './week-summary-cards.component.html',
  styleUrls: ['./week-summary-cards.component.css']
})
export class WeekSummaryCardsComponent implements OnChanges {
  @Input() weekStats!: WeekStats;

  sectionVisible = false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('weekStats changed:', changes['weekStats'].currentValue);
  }
  onSectionVisible() {
    this.sectionVisible = true;
  }
}
