import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthSession } from '@auth/domain/auth.model';
import { AuthRepository } from '@auth/domain/auth-repository';

@Service({ autoProvided: false })
export class GetSessionsUsecase {
  private readonly repo = inject(AuthRepository);

  execute(): Observable<AuthSession[]> {
    return this.repo.getSessions();
  }
}
