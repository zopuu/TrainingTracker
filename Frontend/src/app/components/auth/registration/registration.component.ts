import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup,ValidationErrors,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, of } from 'rxjs';

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
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    {validators: this.passwordMatchValidator}
  );

  }
  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass  = group.get('password')?.value;
    const conf  = group.get('confirmPassword')?.value;
    return pass && conf && pass !== conf ? { passwordMismatch: true } : null;
  }
  register(): void {
    if (this.registrationForm.invalid) return;

    this.authService.register(this.registrationForm.value).pipe(
      catchError(err => {
        if (err.status === 409) this.registrationForm.setErrors({ usernameTaken: true });
        return of(null);
      })
    ).subscribe(res => res && this.router.navigate(['/login']));
  }

}
