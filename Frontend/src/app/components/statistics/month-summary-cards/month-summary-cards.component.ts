import { Component, Input } from '@angular/core';
import { MonthStats } from 'src/app/services/training.service';

@Component({
  selector: 'app-month-summary-cards',
  templateUrl: './month-summary-cards.component.html',
  styleUrls: ['./month-summary-cards.component.css']
})

export class MonthSummaryCardsComponent {
  @Input() stats!: MonthStats;
}
