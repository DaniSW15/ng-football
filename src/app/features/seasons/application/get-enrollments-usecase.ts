import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../domain/season-model';
import { SeasonRepository } from '../domain/season-repository';

@Service({ autoProvided: false })
export class GetEnrollmentsUsecase {
  private readonly seasonRepository = inject(SeasonRepository);

  execute(seasonId: string): Observable<Enrollment[]> {
    return this.seasonRepository.getEnrollments(seasonId);
  }
}
