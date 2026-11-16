import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'teams',
    loadChildren: () =>
      import('@features/teams/teams.routes').then((m) => m.TEAMS_ROUTES),
  },
  { path: '', redirectTo: 'teams', pathMatch: 'full' },
];
