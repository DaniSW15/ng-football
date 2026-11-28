import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { RenameTeamPayload, Team } from '@teams/domain/team.model';
import { TeamRepository } from '@teams/domain/team-repository';

@Service({ autoProvided: false })
export class RenameTeamUsecase {
  private readonly repo = inject(TeamRepository);

  execute(id: string, payload: RenameTeamPayload): Observable<Team> {
    return this.repo.rename(id, payload);
  }
}
