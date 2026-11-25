import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthSessionResult, LoginPayload } from '../domain/auth.model';
import { AuthRepository } from '../domain/auth-repository';

@Service({ autoProvided: false })
export class LoginUsecase {
  private readonly repo = inject(AuthRepository);

  execute(payload: LoginPayload): Observable<AuthSessionResult> {
    return this.repo.login(payload);
  }
}
