import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



type TrainingType = 'cardio' | 'strength' | 'flexibility' | 'recovery' | 'other';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.css']
})
export class TrainingFormComponent {
  form: FormGroup;
  trainingTypes: TrainingType[] = [
    'cardio',
    'strength',
    'flexibility',
    'recovery',
    'other',
  ];
  detailsVisible = false;

  
  activityMap: Record<TrainingType,string[]> = {
    cardio: ['running', 'cycling', 'swimming'],
    strength: ['weightlifting', 'bodyweight', 'resistance bands'],
    flexibility: ['yoga', 'stretching', 'pilates'],
    recovery: ['foam rolling', 'active recovery', 'passive recovery'],
    other: ['other']
  };
  selectedActivities: string[] = [];
  selectedTrainingType: TrainingType | '' = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      trainingType: ['', Validators.required],
      activity: ['', Validators.required],
      datetime: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      difficulty: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      fatigue: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      calories: ['', [Validators.required, Validators.min(1)]],
      notes: ['']
    });

    this.toggleDetailValidators(false);
  }
  onTrainingTypeChange(type: TrainingType) {
    this.selectedActivities = this.activityMap[type] || [];
    this.selectedTrainingType = type;
    this.detailsVisible = false;
    this.form.get('activity')!.reset();
    this.toggleDetailValidators(false);
  }
  onActivityChange(activity: string) {
    if (this.form.get('activity')!.value) {
      this.detailsVisible = true;
      this.toggleDetailValidators(true);
    }
  }
  private toggleDetailValidators(enable: boolean): void {
    ['duration', 'difficulty', 'fatigue'].forEach(ctrlName => {
      const ctrl = this.form.get(ctrlName);
      if (!ctrl) { return; }         
      if (enable) {
        ctrl.addValidators(Validators.required);
      } else {
        ctrl.clearValidators();
      }
      ctrl.updateValueAndValidity();
    });
  }
  
  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Form submitted:', formData);
      // TODO

    } else {
      console.log('Form is invalid');
    }
  }

}