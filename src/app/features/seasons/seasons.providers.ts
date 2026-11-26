import { Provider } from '@angular/core';
import { CompetitionRepository } from '@features/competitions/domain/competition-repository';
import { CompetitionHttpAdapter } from '@features/competitions/infrastructure/competition-http-adapter';
import { GetCompetitionsUsecase } from '@features/competitions/application/get-competitions-usecase';
import { TeamRepository } from '@features/teams/domain/team-repository';
import { TeamHttpAdapter } from '@features/teams/infrastructure/team-http-adapter';
import { GetTeamsUsecase } from '@features/teams/application/get-teams-usecase';
import { SeasonRepository } from './domain/season-repository';
import { SeasonHttpAdapter } from './infrastructure/season-http-adapter';
import { GetSeasonsByCompetitionUsecase } from './application/get-seasons-by-competition-usecase';
import { GetSeasonUsecase } from './application/get-season-usecase';
import { CreateSeasonUsecase } from './application/create-season-usecase';
import { ActivateSeasonUsecase } from './application/activate-season-usecase';
import { GetEnrollmentsUsecase } from './application/get-enrollments-usecase';
import { EnrollTeamUsecase } from './application/enroll-team-usecase';
import { SeasonsStore } from './presentation/state/seasons-store';

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
