import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Competition } from '../domain/competition-model';
import { CompetitionRepository } from '../domain/competition-repository';

@Service({ autoProvided: false })
export class GetCompetitionsUsecase {
  private readonly competitionRepository = inject(CompetitionRepository);

  execute(): Observable<Competition[]> {
    return this.competitionRepository.getAll();
  }
}
