import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'teams',
    loadChildren: () =>
      import('@teams/teams.routes').then((m) => m.TEAMS_ROUTES),
  },
  {
    path: 'competitions',
    loadChildren: () =>
      import('@competitions/competitions.routes').then(
        (m) => m.COMPETITIONS_ROUTES
      ),
  },
  {
    path: 'seasons',
    loadChildren: () =>
      import('@seasons/seasons.routes').then((m) => m.SEASONS_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  { path: '', redirectTo: 'teams', pathMatch: 'full' },
];
