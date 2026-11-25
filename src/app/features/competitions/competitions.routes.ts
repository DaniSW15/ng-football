import { Routes } from "@angular/router";
import { COMPETITIONS_PROVIDERS } from "./competitions.providers";

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
      }
    ]
  }
]
