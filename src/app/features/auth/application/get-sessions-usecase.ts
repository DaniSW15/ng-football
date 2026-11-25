import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthSession } from '../domain/auth.model';
import { AuthRepository } from '../domain/auth-repository';

@Service({ autoProvided: false })
export class GetSessionsUsecase {
  private readonly repo = inject(AuthRepository);

  execute(): Observable<AuthSession[]> {
    return this.repo.getSessions();
  }
}
