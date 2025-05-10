import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingRecord } from '../models/training-record.model';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private readonly api = 'http://localhost:5092/api/TrainingRecord';

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
}
