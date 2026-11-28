import { Routes } from '@angular/router';
import { SEASONS_PROVIDERS } from './seasons.providers';

export const SEASONS_ROUTES: Routes = [
  {
    path: '',
    providers: SEASONS_PROVIDERS,
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            '@seasons/presentation/pages/season-list/season-list'
          ).then((m) => m.SeasonList),
      },
      {
        path: ':seasonId',
        loadComponent: () =>
          import(
            '@seasons/presentation/pages/season-detail/season-detail'
          ).then((m) => m.SeasonDetailPage),
      },
    ],
  },
];
