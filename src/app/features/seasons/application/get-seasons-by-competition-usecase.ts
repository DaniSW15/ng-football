import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Season } from '../domain/season-model';
import { SeasonRepository } from '../domain/season-repository';

@Service({ autoProvided: false })
export class GetSeasonsByCompetitionUsecase {
  private readonly seasonRepository = inject(SeasonRepository);

  execute(competitionId: string): Observable<Season[]> {
    return this.seasonRepository.getByCompetition(competitionId);
  }
}
