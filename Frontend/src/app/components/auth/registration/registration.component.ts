import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup,ValidationErrors,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    },
    {validators: this.passwordMatchValidator}
  );

  }
  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass  = group.get('password')?.value;
    const conf  = group.get('confirmPassword')?.value;
  
    if (pass && conf && pass !== conf) {
      // mark the child
      group.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // clear mismatch error but keep any others (e.g. required/minLength)
      const errors = group.get('confirmPassword')?.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        if (!Object.keys(errors).length) {
          group.get('confirmPassword')?.setErrors(null);
        }
      }
      return null;
    }
  }
  
  register(): void {
    if (this.registrationForm.invalid) return;
  
    this.authService.register(this.registrationForm.value).pipe(
      catchError(err => {
        if (err.status === 409) {
          this.registrationForm.get('username')?.setErrors({ usernameTaken: true });
        }
        return of(null); // Prevent breaking the stream
      })
    ).subscribe(res => {
      if (res) {
        Swal.fire({
          icon: 'success',
          title: 'Registered Successfully',
          text: 'You can now log in with your credentials',
          showConfirmButton: false,
          timer: 2500
        }).then(() => this.router.navigate(['/login']));
      }
    });
  }

}
