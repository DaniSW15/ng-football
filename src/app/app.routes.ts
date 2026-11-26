import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'teams',
    loadChildren: () =>
      import('@features/teams/teams.routes').then((m) => m.TEAMS_ROUTES),
  },
  {
    path: 'competitions',
    loadChildren: () =>
      import('@features/competitions/competitions.routes').then(
        (m) => m.COMPETITIONS_ROUTES
      ),
  },
  {
    path: 'seasons',
    loadChildren: () =>
      import('@features/seasons/seasons.routes').then((m) => m.SEASONS_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  { path: '', redirectTo: 'teams', pathMatch: 'full' },
];
