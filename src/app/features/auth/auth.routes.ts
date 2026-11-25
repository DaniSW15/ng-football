import { Routes } from '@angular/router';
import { authGuard, guestGuard } from '@core';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('@features/auth/presentation/pages/login/login.page').then(
        (m) => m.LoginPage
      ),
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('@features/auth/presentation/pages/register/register.page').then(
        (m) => m.RegisterPage
      ),
  },
  {
    path: 'sessions',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@features/auth/presentation/pages/sessions/sessions.page').then(
        (m) => m.SessionsPage
      ),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
