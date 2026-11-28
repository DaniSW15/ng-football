import { Routes } from "@angular/router";
import { COMPETITIONS_PROVIDERS } from "./competitions.providers";
import { SEASONS_PROVIDERS } from "@seasons/seasons.providers";

export const COMPETITIONS_ROUTES: Routes = [
  {
    path: "",
    providers: [COMPETITIONS_PROVIDERS],
    children: [
      {
        path: "",
        loadComponent: () =>
          import(
            "@competitions/presentation/pages/competition-list/competition-list"
          ).then((m) => m.CompetitionListPage),
      },
      {
        path: ":competitionId/seasons",
        providers: [SEASONS_PROVIDERS],
        loadComponent: () =>
          import(
            "@seasons/presentation/pages/season-list/season-list"
          ).then((m) => m.SeasonList),
      },
    ],
  },
];
