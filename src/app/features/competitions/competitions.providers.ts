import { Provider } from '@angular/core';
import { CompetitionRepository } from '@competitions/domain/competition-repository';
import { CompetitionHttpAdapter } from '@competitions/infrastructure/competition-http-adapter';
import { GetCompetitionsUsecase } from '@competitions/application/get-competitions-usecase';
import { CreateCompetitionUsecase } from '@competitions/application/create-competition-usecase';
import { DeleteCompetitionUsecase } from '@competitions/application/delete-competition-usecase';
import { RenameCompetitionUsecase } from '@competitions/application/rename-competition-usecase';
import { CompetitionsStore } from '@competitions/presentation/state/competitions-store';

export const COMPETITIONS_PROVIDERS: Provider[] = [
  { provide: CompetitionRepository, useClass: CompetitionHttpAdapter },
  GetCompetitionsUsecase,
  CreateCompetitionUsecase,
  DeleteCompetitionUsecase,
  RenameCompetitionUsecase,
  CompetitionsStore,
];
