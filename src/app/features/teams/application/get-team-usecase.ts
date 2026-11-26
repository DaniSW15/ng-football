import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../domain/team.model';
import { TeamRepository } from '../domain/team-repository';

@Service({ autoProvided: false })
export class GetTeamUsecase {
  private readonly repo = inject(TeamRepository);

  execute(id: string): Observable<Team> {
    return this.repo.getById(id);
  }
}
