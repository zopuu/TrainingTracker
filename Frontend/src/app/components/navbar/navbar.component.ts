import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingFormComponent } from '../training-form/training-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) {}

  openTrainingForm() {
    this.dialog.open(TrainingFormComponent, {
      width: '400px',
      maxHeight: '90vh',
      panelClass: 'training-form-dialog',
      data: { name: 'Training Form' }
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
