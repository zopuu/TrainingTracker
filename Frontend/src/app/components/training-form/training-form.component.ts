import { Component,OnDestroy,ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subject,takeUntil } from 'rxjs';
import { TrainingType,ACTIVITY_MAP,ActivityOption } from 'src/app/models/activity-data';
import { TrainingService } from 'src/app/services/training.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingFormComponent implements OnDestroy {
  form: FormGroup = this.fb.nonNullable.group({
    trainingDateTime: ['', [Validators.required, this.noFutureDateValidator]],
    trainingType: ['', Validators.required],
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
  noFutureDateValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const now = new Date();

    return inputDate > now ? { futureDate: true } : null;
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
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Training record created successfully',
          confirmButtonText: 'Ok',
          timer: 3500
        }).then(() => {
          this.dialogRef.close(true);
        });
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error creating training record',
          text: 'Check your input and try again',
          confirmButtonText: 'Ok'
        });
         // Log the error to the console
        console.error(err)
      }
    });
  }
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}