import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MonthStats } from 'src/app/services/training.service';

@Component({
  selector: 'app-month-summary-cards',
  templateUrl: './month-summary-cards.component.html',
  styleUrls: ['./month-summary-cards.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MonthSummaryCardsComponent {
  @Input() stats!: MonthStats;
  
  sectionVisible = false;

  onSectionVisible() {
    this.sectionVisible = true;
  }
}
