import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { CompetitionRepository } from '../domain/competition-repository';

@Service({ autoProvided: false })
export class DeleteCompetitionUsecase {
  private readonly competitionRepository = inject(CompetitionRepository);

  execute(id: string): Observable<void> {
    return this.competitionRepository.delete(id);
  }
}
