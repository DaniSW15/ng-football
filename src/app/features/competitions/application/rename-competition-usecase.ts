import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Competition,
  RenameCompetitionPayload,
} from '@competitions/domain/competition-model';
import { CompetitionRepository } from '@competitions/domain/competition-repository';

@Service({ autoProvided: false })
export class RenameCompetitionUsecase {
  private readonly competitionRepository = inject(CompetitionRepository);

  execute(
    id: string,
    payload: RenameCompetitionPayload
  ): Observable<Competition> {
    return this.competitionRepository.rename(id, payload);
  }
}
