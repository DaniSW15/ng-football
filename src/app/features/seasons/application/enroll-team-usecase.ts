import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment, EnrollTeamPayload } from '@seasons/domain/season-model';
import { SeasonRepository } from '@seasons/domain/season-repository';

@Service({ autoProvided: false })
export class EnrollTeamUsecase {
  private readonly seasonRepository = inject(SeasonRepository);

  execute(
    seasonId: string,
    payload: EnrollTeamPayload
  ): Observable<Enrollment> {
    return this.seasonRepository.enrollTeam(seasonId, payload);
  }
}
