import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Competition, CreateCompetitionPayload } from '../domain/competition-model';
import { CompetitionRepository } from '../domain/competition-repository';

@Service({ autoProvided: false })
export class CreateCompetitionUsecase {
  private readonly competitionRepository = inject(CompetitionRepository);

  execute(payload: CreateCompetitionPayload): Observable<Competition> {
    return this.competitionRepository.create(payload);
  }
}
