import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSeasonPayload, Season } from '@seasons/domain/season-model';
import { SeasonRepository } from '@seasons/domain/season-repository';

@Service({ autoProvided: false })
export class CreateSeasonUsecase {
  private readonly seasonRepository = inject(SeasonRepository);

  execute(
    competitionId: string,
    payload: CreateSeasonPayload
  ): Observable<Season> {
    return this.seasonRepository.create(competitionId, payload);
  }
}
