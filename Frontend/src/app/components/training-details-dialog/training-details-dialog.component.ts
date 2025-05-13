import { Component } from '@angular/core';
import { TrainingRecord } from 'src/app/models/training-record.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-training-details-dialog',
  templateUrl: './training-details-dialog.component.html',
  styleUrls: ['./training-details-dialog.component.css']
})
export class TrainingDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: TrainingRecord[], private dialogRef: MatDialogRef<TrainingDetailsDialogComponent>) { }

  icon(type: string): string {
    switch (type) {
      case 'cardio': return 'directions_run';
      case 'strength': return 'fitness_center';
      case 'flexibility': return 'accessibility_new';
      case 'recovery': return 'self_improvement';
      default: return 'help_outline';
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

