import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    }),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
  });
  login() {
    if (this.loginForm.invalid) return;
  
    const { username, password } = this.loginForm.value;
    if (!username || !password) return;
    this.authService.login(username, password).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Login successful',
          text: 'You have successfully logged in.',
          showConfirmButton: false,
          timer: 2500
        });
        this.router.navigate(['/'])
      },
      error: () =>{
        this.loginForm.setErrors({ invalidCredentials: true })
      } 
    });
  }
}
