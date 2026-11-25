import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthSessionService } from '../services/auth-session';

/** Protege rutas que requieren un JWT activo */
export const authGuard: CanActivateFn = (_route, state) => {
  const session = inject(AuthSessionService);
  const router = inject(Router);

  if (session.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/auth/login'], {
    queryParams: { returnUrl: state.url },
  });
};

/** Evita que usuarios ya autenticados entren a login o registro */
export const guestGuard: CanActivateFn = () => {
  const session = inject(AuthSessionService);
  const router = inject(Router);

  if (!session.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/auth/sessions']);
};
