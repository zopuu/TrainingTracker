import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingRecord } from '../models/training-record.model';

export interface MonthStats {
  totalMinutes: number;
  sessions: number;
  totalCalories: number;
  favouriteType: string;
  avgDifficulty: number;
  avgFatigue: number;
}
export interface WeekSeriesItem {
  week: number; /* week number */
  series: { name: string; value: number }[]; /* minutes for stacked bar */
}
export interface WeekStats {
  totalMinutes: number;
  sessions: number;
  totalCalories: number;
  avgDifficulty: number;
  avgFatigue: number;
  dominantType: string;
}

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private readonly api = 'http://localhost:5092/api/TrainingRecord';
  private readonly statsApi = 'http://localhost:5092/api/stats';

  constructor(private http: HttpClient) {}

  create(record: TrainingRecord): Observable<TrainingRecord> {
    return this.http.post<TrainingRecord>(this.api, record, {withCredentials: true});
  }

  getAll(): Observable<TrainingRecord[]> {
    return this.http.get<TrainingRecord[]>(this.api, {withCredentials: true});
  }
  getMonthTrainingRecords(year: number, month: number): Observable<TrainingRecord[]> {
    return this.http.get<TrainingRecord[]>(`${this.api}/month?year=${year}&month=${month}`, {withCredentials: true});
  }
  getMonthStats(year: number, month: number): Observable<{
    summary: MonthStats;
    weekSeries: WeekSeriesItem[];
  }> {
    return this.http.get<{
      summary: MonthStats;
      weekSeries: WeekSeriesItem[];
    }>(`${this.statsApi}/month`, {
      params: { year, month },
      withCredentials: true,
    });
  }
  getWeekStats(year: number, month: number, week: number): Observable<WeekStats> {
    return this.http.get<WeekStats>(`${this.statsApi}/week`, {
      params: { year, month, week },
      withCredentials: true
    });
  }

}
