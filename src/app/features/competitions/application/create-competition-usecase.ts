import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Competition, CreateCompetitionPayload } from '@competitions/domain/competition-model';
import { CompetitionRepository } from '@competitions/domain/competition-repository';

@Service({ autoProvided: false })
export class CreateCompetitionUsecase {
  private readonly competitionRepository = inject(CompetitionRepository);

  execute(payload: CreateCompetitionPayload): Observable<Competition> {
    return this.competitionRepository.create(payload);
  }
}
