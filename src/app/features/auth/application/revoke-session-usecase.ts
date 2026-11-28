import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '@auth/domain/auth-repository';

@Service({ autoProvided: false })
export class RevokeSessionUsecase {
  private readonly repo = inject(AuthRepository);

  execute(sessionId: string): Observable<void> {
    return this.repo.revokeSession(sessionId);
  }
}
