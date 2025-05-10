import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { TrainingService } from '../../services/training.service';
import { TrainingRecord } from 'src/app/models/training-record.model';
import { MatDialog } from '@angular/material/dialog';
import { addMonths } from 'date-fns';
import { TrainingDetailsDialogComponent } from '../training-details-dialog/training-details-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  viewDate = new Date();
  events: CalendarEvent[] = [];

  constructor(private trainingService: TrainingService, private dialog: MatDialog) { }
  ngOnInit() { this.loadMonth(); }

  loadMonth() {
    const y = this.viewDate.getFullYear();
    const m = this.viewDate.getMonth() + 1;
    this.trainingService.getMonthTrainingRecords(y, m).subscribe((records => this.events = this.toEvents(records)));
  }
  toEvents(records: TrainingRecord[]): CalendarEvent[] {
    return records.map(record => ({
      start: new Date(record.trainingDateTime),
      allDay: true,
      color: { primary: '#1e90ff', secondary: '#D1E8FF' },
      cssClass: `type-${record.trainingType.toLowerCase()}`,
      meta: record,
      title: record.trainingType
    }));
  }
  iconName(type: string) {
    return ({
      cardio: 'directions_run',
      strength: 'fitness_center',
      flexibility: 'self_improvement',
      recovery: 'healing',

    } as any)[type.toLowerCase()] ?? 'push_pin';
  }
  openDetails(day: CalendarMonthViewDay) {
    if(!day.events.length) return;
    this.dialog.open(TrainingDetailsDialogComponent, {
      data: day.events.map(e => e.meta),
      width: '400px',
    });
  }
  nextMonth() {
    this.viewDate = addMonths(this.viewDate, 1);
    this.loadMonth();
  }
  prevMonth() {
    this.viewDate = addMonths(this.viewDate, -1);
    this.loadMonth();
  }
}
