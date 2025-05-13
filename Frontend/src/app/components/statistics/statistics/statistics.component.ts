import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { TrainingService,MonthStats,WeekStats } from 'src/app/services/training.service';
import { addMonths, startOfMonth } from 'date-fns';
import { ViewportScroller } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnChanges,OnInit {
  @Input() year!: number;
  @Input() month!: number;
  @ViewChild('weekCards') weekCards!: ElementRef<HTMLElement>;

  destroy$ = new Subject<void>();

  viewDate: Date = new Date();

  monthStats!: MonthStats;
  weekSeries: any[] = [];
  selectedWeekStats?: WeekStats;

  monthLoading = true;
  weekLoading = false;
  sectionVisible = false;


  constructor(private trainingService: TrainingService, private cdr: ChangeDetectorRef, private scroller: ViewportScroller) {}
  ngOnInit(): void {
    this.loadMonth();
    this.trainingService.recordCreated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadMonth();
        this.cdr.markForCheck();
      }
    );
  }

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
        this.weekLoading = false;
        this.sectionVisible = false;
        this.cdr.detectChanges(); 
        this.weekCards.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.sectionVisible = true;
      },
      error: () => {
        this.weekLoading = false;
      }
    });
  }
  onSectionVisible() {
    this.sectionVisible = true;
  }
}
