import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Season } from '@seasons/domain/season-model';
import { SeasonRepository } from '@seasons/domain/season-repository';

@Service({ autoProvided: false })
export class ActivateSeasonUsecase {
  private readonly seasonRepository = inject(SeasonRepository);

  execute(seasonId: string): Observable<Season> {
    return this.seasonRepository.activate(seasonId);
  }
}
