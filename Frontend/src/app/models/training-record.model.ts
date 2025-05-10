import { TrainingType } from './activity-data';

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
