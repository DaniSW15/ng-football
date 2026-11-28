import { Provider } from '@angular/core';
import { CompetitionRepository } from '@competitions/domain/competition-repository';
import { CompetitionHttpAdapter } from '@competitions/infrastructure/competition-http-adapter';
import { GetCompetitionsUsecase } from '@competitions/application/get-competitions-usecase';
import { TeamRepository } from '@teams/domain/team-repository';
import { TeamHttpAdapter } from '@teams/infrastructure/team-http-adapter';
import { GetTeamsUsecase } from '@teams/application/get-teams-usecase';
import { SeasonRepository } from '@seasons/domain/season-repository';
import { SeasonHttpAdapter } from '@seasons/infrastructure/season-http-adapter';
import { GetSeasonsByCompetitionUsecase } from '@seasons/application/get-seasons-by-competition-usecase';
import { GetSeasonUsecase } from '@seasons/application/get-season-usecase';
import { CreateSeasonUsecase } from '@seasons/application/create-season-usecase';
import { ActivateSeasonUsecase } from '@seasons/application/activate-season-usecase';
import { GetEnrollmentsUsecase } from '@seasons/application/get-enrollments-usecase';
import { EnrollTeamUsecase } from '@seasons/application/enroll-team-usecase';
import { SeasonsStore } from '@seasons/presentation/state/seasons-store';

export const SEASONS_PROVIDERS: Provider[] = [
  { provide: SeasonRepository, useClass: SeasonHttpAdapter },
  { provide: CompetitionRepository, useClass: CompetitionHttpAdapter },
  { provide: TeamRepository, useClass: TeamHttpAdapter },
  GetSeasonsByCompetitionUsecase,
  GetSeasonUsecase,
  CreateSeasonUsecase,
  ActivateSeasonUsecase,
  GetEnrollmentsUsecase,
  EnrollTeamUsecase,
  GetCompetitionsUsecase,
  GetTeamsUsecase,
  SeasonsStore,
];
