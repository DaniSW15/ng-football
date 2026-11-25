import { Provider } from '@angular/core';
import { CompetitionRepository } from './domain/competition-repository';
import { CompetitionHttpAdapter } from './infrastructure/competition-http-adapter';
import { GetCompetitionsUsecase } from './application/get-competitions-usecase';
import { CreateCompetitionUsecase } from './application/create-competition-usecase';
import { DeleteCompetitionUsecase } from './application/delete-competition-usecase';
import { RenameCompetitionUsecase } from './application/rename-competition-usecase';
import { CompetitionsStore } from './presentation/state/competitions-store';

export const COMPETITIONS_PROVIDERS: Provider[] = [
  { provide: CompetitionRepository, useClass: CompetitionHttpAdapter },
  GetCompetitionsUsecase,
  CreateCompetitionUsecase,
  DeleteCompetitionUsecase,
  RenameCompetitionUsecase,
  CompetitionsStore,
];
