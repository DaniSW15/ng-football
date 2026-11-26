import { Routes } from "@angular/router";
import { COMPETITIONS_PROVIDERS } from "./competitions.providers";
import { SEASONS_PROVIDERS } from "@features/seasons/seasons.providers";

export const COMPETITIONS_ROUTES: Routes = [
  {
    path: "",
    providers: [COMPETITIONS_PROVIDERS],
    children: [
      {
        path: "",
        loadComponent: () =>
          import(
            "@features/competitions/presentation/pages/competition-list/competition-list"
          ).then((m) => m.CompetitionListPage),
      },
      {
        path: ":competitionId/seasons",
        providers: [SEASONS_PROVIDERS],
        loadComponent: () =>
          import(
            "@features/seasons/presentation/pages/season-list/season-list"
          ).then((m) => m.SeasonList),
      },
    ],
  },
];
