import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDetailsDialogComponent } from './training-details-dialog.component';

describe('TrainingDetailsDialogComponent', () => {
  let component: TrainingDetailsDialogComponent;
  let fixture: ComponentFixture<TrainingDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(TrainingDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
