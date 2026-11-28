import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Competition } from '@competitions/domain/competition-model';
import { CompetitionRepository } from '@competitions/domain/competition-repository';

@Service({ autoProvided: false })
export class GetCompetitionsUsecase {
  private readonly competitionRepository = inject(CompetitionRepository);

  execute(): Observable<Competition[]> {
    return this.competitionRepository.getAll();
  }
}
