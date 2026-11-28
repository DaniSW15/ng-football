import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '@auth/domain/auth-repository';

@Service({ autoProvided: false })
export class LogoutUsecase {
  private readonly repo = inject(AuthRepository);

  execute(): Observable<void> {
    return this.repo.logout();
  }
}
