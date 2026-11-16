import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Team, CreateTeamPayload } from '../domain/team.model';
import { TeamRepository } from '../domain/team-repository';

@Service({ autoProvided: false })
export class CreateTeamUsecase {
  private readonly repo = inject(TeamRepository);

  execute(payload: CreateTeamPayload): Observable<Team> {
    // Aquí podrían ir validaciones de negocio adicionales
    return this.repo.create(payload);
  }
}
