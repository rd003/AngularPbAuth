import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, tap, throwError } from 'rxjs';

export const routeGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // token is valid or not or pb.authStore.isValid=true/false

  authService.updateUserSubjet();  //to get latest validation state (isValid)

  let isLoggedIn = false;
  authService.user$.pipe(
    tap(user => {
      if (!user)
        isLoggedIn = false;
      isLoggedIn = user!.isValid;
    }),
    catchError(error => {
      console.log(error);
      return throwError(() => error)
    })
  ).subscribe();
  
  if (!isLoggedIn) 
    router.navigate(['/login']);
  return isLoggedIn;
};
