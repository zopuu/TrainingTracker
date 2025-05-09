import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingType } from '../models/activity-data';

export interface TrainingRecord {
  trainingDateTime: string;             // ISO string
  trainingType: TrainingType;
  activity: string;
  duration: number;
  difficulty: number;
  fatigue: number;
  calories?: number;
  notes?: string;
}

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private readonly api = 'https://localhost:5092/api/TrainingRecord';

  constructor(private http: HttpClient) {}

  create(record: TrainingRecord): Observable<TrainingRecord> {
    return this.http.post<TrainingRecord>(this.api, record);
  }

  getAll(): Observable<TrainingRecord[]> {
    return this.http.get<TrainingRecord[]>(this.api);
  }
}
