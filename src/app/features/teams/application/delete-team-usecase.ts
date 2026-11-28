import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamRepository } from '@teams/domain/team-repository';

@Service({ autoProvided: false })
export class DeleteTeamUsecase {
  private readonly repo = inject(TeamRepository);

  execute(id: string): Observable<void> {
    return this.repo.delete(id);
  }
}
