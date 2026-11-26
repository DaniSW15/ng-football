import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { RenameTeamPayload, Team } from '../domain/team.model';
import { TeamRepository } from '../domain/team-repository';

@Service({ autoProvided: false })
export class RenameTeamUsecase {
  private readonly repo = inject(TeamRepository);

  execute(id: string, payload: RenameTeamPayload): Observable<Team> {
    return this.repo.rename(id, payload);
  }
}
