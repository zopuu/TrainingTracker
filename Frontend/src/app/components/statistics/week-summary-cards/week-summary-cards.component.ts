import { Component, Input } from '@angular/core';
import { WeekStats } from 'src/app/services/training.service';

@Component({
  selector: 'app-week-summary-cards',
  templateUrl: './week-summary-cards.component.html',
  styleUrls: ['./week-summary-cards.component.css']
})
export class WeekSummaryCardsComponent {
  @Input() weekStats!: WeekStats;
}
