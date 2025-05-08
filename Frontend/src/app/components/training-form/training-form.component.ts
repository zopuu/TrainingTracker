import { Component,OnDestroy,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject,takeUntil } from 'rxjs';
import { TrainingType,ACTIVITY_MAP,ActivityOption } from 'src/app/models/activity-data';


@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingFormComponent implements OnDestroy {
  form: FormGroup = this.fb.nonNullable.group({
    datetime: ['', Validators.required],
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

  /** teardown */
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    /* react to Training Type changes */
    this.form
      .get('trainingType')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((type: TrainingType) => {
        this.activities = ACTIVITY_MAP[type];
        this.form.get('activity')!.reset();
        this.setDetailsVisible(false);
      });

    /* react to Activity selection */
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
    if (this.form.valid) {
      console.log('Training data ➜', this.form.value);
      // TODO: call TrainingService.save(this.form.value)
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}