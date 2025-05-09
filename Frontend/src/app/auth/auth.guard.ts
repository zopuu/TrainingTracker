import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  return auth.ping().pipe(
    map(() => true),                       
    catchError(() => {                     
      router.navigate(['/login'], {
        queryParams: { returnUrl: state.url } 
      });
      return of(false);
    })
  );
};
