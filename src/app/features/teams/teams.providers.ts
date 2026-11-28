import { Provider } from '@angular/core';
import { TeamRepository } from '@teams/domain/team-repository';
import { TeamHttpAdapter } from '@teams/infrastructure/team-http-adapter';
import { GetTeamsUsecase } from '@teams/application/get-teams-usecase';
import { GetTeamUsecase } from '@teams/application/get-team-usecase';
import { CreateTeamUsecase } from '@teams/application/create-team-usecase';
import { RenameTeamUsecase } from '@teams/application/rename-team-usecase';
import { DeleteTeamUsecase } from '@teams/application/delete-team-usecase';
import { TeamsStore } from '@teams/presentation/state/teams-store';

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
