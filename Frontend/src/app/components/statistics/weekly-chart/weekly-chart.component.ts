import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeekSeriesItem } from 'src/app/services/training.service';

@Component({
  selector: 'app-weekly-chart',
  templateUrl: './weekly-chart.component.html',
  styleUrls: ['./weekly-chart.component.css']
})
export class WeeklyChartComponent {
  @Input() series: WeekSeriesItem[] = [];
  @Output() weekSelect = new EventEmitter<number>();
}
