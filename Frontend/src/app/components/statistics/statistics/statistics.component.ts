import { Component, OnInit } from '@angular/core';
import { TrainingService,MonthStats,WeekStats } from 'src/app/services/training.service';
import { addMonths, startOfMonth } from 'date-fns';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{
  viewDate: Date = new Date();

  monthStats!: MonthStats;
  weekSeries: any[] = [];
  selectedWeekStats?: WeekStats;

  monthLoading = true;
  weekLoading = false;

  constructor(private trainingService: TrainingService) {}
  ngOnInit(): void {
    this.loadMonth();
  }
  loadMonth() {
    this.monthLoading = true;
    const y = this.viewDate.getFullYear();
    const m = this.viewDate.getMonth() + 1;

    this.trainingService.getMonthStats(y, m).subscribe({
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
  onWeekSelect(weekIndex: number) {
    this.weekLoading = true;
    const y = this.viewDate.getFullYear();
    const m = this.viewDate.getMonth() + 1;
    const weekStats = this.weekSeries[weekIndex];
    this.trainingService.getWeekStats(y, m, weekIndex).subscribe({
      next: (res) => {
        this.selectedWeekStats = res;
        this.weekLoading = false;
      },
      error: () => {
        this.weekLoading = false;
      }
    });
  }
}
