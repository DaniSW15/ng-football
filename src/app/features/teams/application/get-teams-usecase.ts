import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../domain/team.model';
import { TeamRepository } from '../domain/team-repository';

/**
 * Caso de uso — orquesta lógica de negocio.
 * Depende del PUERTO (TeamRepository), no del adaptador concreto.
 */
@Service({ autoProvided: false })
export class GetTeamsUsecase {
  private readonly repo = inject(TeamRepository);

  execute(): Observable<Team[]> {
    return this.repo.getAll();
  }
}
