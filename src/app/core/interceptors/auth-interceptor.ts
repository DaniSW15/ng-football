import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  finalize,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { AuthRepository } from '@auth/domain/auth-repository';
import { AuthSessionService } from '../services/auth-session';

const PUBLIC_AUTH_ENDPOINTS = ['/auth/login', '/auth/register', '/auth/refresh'];

function isPublicAuthRequest(url: string): boolean {
  return PUBLIC_AUTH_ENDPOINTS.some((path) => url.includes(path));
}

/**
 * Interceptor de autenticación JWT:
 * 1. Adjunta `Authorization: Bearer <access_token>` en peticiones protegidas.
 * 2. Ante un 401, intenta renovar tokens vía POST /auth/refresh de forma
 *    deduplicada y reintenta la petición original.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const session = inject(AuthSessionService);
  const router = inject(Router);
  const injector = inject(Injector);

  const isPublicAuth = isPublicAuthRequest(req.url);
  const token = session.accessToken();

  const authReq =
    !isPublicAuth && token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

  return next(authReq).pipe(
    catchError((error: unknown) => {
      if (
        !(error instanceof HttpErrorResponse) ||
        error.status !== 401 ||
        isPublicAuth ||
        req.url.includes('/auth/logout')
      ) {
        return throwError(() => error);
      }

      const refreshToken = session.refreshToken();
      if (!refreshToken) {
        session.clearSession();
        void router.navigate(['/auth/login']);
        return throwError(() => error);
      }

      if (!session.refreshInFlight$) {
        const authRepo = injector.get(AuthRepository);
        session.refreshInFlight$ = authRepo.refresh(refreshToken).pipe(
          tap((result) => session.setSession(result)),
          shareReplay(1),
          finalize(() => {
            session.refreshInFlight$ = null;
          })
        );
      }

      return session.refreshInFlight$.pipe(
        switchMap((result) => {
          const retriedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${result.tokens.accessToken}`,
            },
          });
          return next(retriedReq);
        }),
        catchError((refreshError) => {
          session.clearSession();
          void router.navigate(['/auth/login']);
          return throwError(() => refreshError);
        })
      );
    })
  );
};
