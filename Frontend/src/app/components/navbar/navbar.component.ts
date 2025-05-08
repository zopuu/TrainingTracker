import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingFormComponent } from '../training-form/training-form.component';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private dialog: MatDialog) {}

  openTrainingForm() {
    this.dialog.open(TrainingFormComponent, {
      width: '400px',
      data: { name: 'Training Form' }
    });
}
}
