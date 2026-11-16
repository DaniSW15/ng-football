import { Routes } from '@angular/router';
import { TEAMS_PROVIDERS } from './teams.providers';

export const TEAMS_ROUTES: Routes = [
  {
    path: '',
    providers: TEAMS_PROVIDERS,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./presentation/pages/team-list/team-list.page').then(
            (m) => m.TeamListPage
          ),
      },
    ],
  },
];
