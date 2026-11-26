import { Provider } from '@angular/core';
import { TeamRepository } from './domain/team-repository';
import { TeamHttpAdapter } from './infrastructure/team-http-adapter';
import { GetTeamsUsecase } from './application/get-teams-usecase';
import { GetTeamUsecase } from './application/get-team-usecase';
import { CreateTeamUsecase } from './application/create-team-usecase';
import { RenameTeamUsecase } from './application/rename-team-usecase';
import { DeleteTeamUsecase } from './application/delete-team-usecase';
import { TeamsStore } from './presentation/state/teams-store';

/**
 * Providers de la feature — aquí se conecta el puerto con el adaptador.
 * Cambiar de HTTP a WebSocket o Mock: solo cambiar la línea useClass.
 */
export const TEAMS_PROVIDERS: Provider[] = [
  { provide: TeamRepository, useClass: TeamHttpAdapter },
  GetTeamsUsecase,
  GetTeamUsecase,
  CreateTeamUsecase,
  RenameTeamUsecase,
  DeleteTeamUsecase,
  TeamsStore,
];
