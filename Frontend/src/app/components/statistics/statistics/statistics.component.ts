import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { TrainingService,MonthStats,WeekStats } from 'src/app/services/training.service';
import { addMonths, startOfMonth } from 'date-fns';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnChanges {
  @Input() year!: number;
  @Input() month!: number;

  viewDate: Date = new Date();

  monthStats!: MonthStats;
  weekSeries: any[] = [];
  selectedWeekStats?: WeekStats;

  monthLoading = true;
  weekLoading = false;

  constructor(private trainingService: TrainingService, private cdr: ChangeDetectorRef) {}
  /*ngOnInit(): void {
    this.loadMonth();
  }*/
    ngOnChanges(changes: SimpleChanges) {
      if (changes['year'] || changes['month']) {
        this.loadMonth();
      }
    }
  loadMonth() {
    this.monthLoading = true;

    this.trainingService.getMonthStats(this.year, this.month).subscribe({
      next: (res) => {
        this.monthStats = res.summary;
        this.weekSeries = res.weekSeries;
        this.selectedWeekStats = undefined;
        this.monthLoading = false;
      },
      error: () => {
        this.monthLoading = false;
      }
    });
  }
  onWeekSelect(isoWeek: number) {
    this.weekLoading = true;
    this.trainingService.getWeekStats(this.year, this.month, isoWeek).subscribe({
      next: (res) => {
        this.selectedWeekStats = { ...res };
        console.log("Selected week status: ",this.selectedWeekStats);
        this.weekLoading = false;
        this.cdr.detectChanges(); // Trigger change detection
      },
      error: () => {
        this.weekLoading = false;
      }
    });
  }
}
