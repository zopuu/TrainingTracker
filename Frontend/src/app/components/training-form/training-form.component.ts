import { Component,OnDestroy,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject,takeUntil } from 'rxjs';
import { TrainingType,ACTIVITY_MAP,ActivityOption } from 'src/app/models/activity-data';
import { TrainingService } from 'src/app/services/training.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingFormComponent implements OnDestroy {
  form: FormGroup = this.fb.nonNullable.group({
    trainingDateTime: ['', Validators.required],
    trainingType: [TrainingType.Cardio, Validators.required],
    activity: ['', Validators.required],
    details: this.fb.group({
      duration: [null, Validators.min(1)],
      difficulty: [null, [Validators.min(1), Validators.max(10)]],
      fatigue: [null, [Validators.min(1), Validators.max(10)]],
      calories: [null, Validators.min(1)]
    }),

    notes: ['']
  });
  
  readonly trainingTypes = Object.values(TrainingType);
  activities: ActivityOption[] = ACTIVITY_MAP[TrainingType.Cardio];
  detailsVisible = false;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private service: TrainingService, private dialogRef: MatDialogRef<TrainingFormComponent>) {
    this.form
      .get('trainingType')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((type: TrainingType) => {
        this.activities = ACTIVITY_MAP[type];
        this.form.get('activity')!.reset();
        this.setDetailsVisible(false);
      });

    this.form
      .get('activity')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((val) => this.setDetailsVisible(!!val));
  }
  private setDetailsVisible(show: boolean): void {
    this.detailsVisible = show;
    const detailsGroup = this.form.get('details')!;
    show ? detailsGroup.enable() : detailsGroup.disable();
  }

  onSubmit(): void {
    if (!this.form.valid) return;
  
    const record = {
      ...this.form.value,
      ...this.form.value.details
    };
    delete record.details;

    const local = this.form.value.trainingDateTime;       
    record.trainingDateTime = new Date(local).toISOString();
  
    this.service.create(record).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => console.error(err)
    });
  }
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}