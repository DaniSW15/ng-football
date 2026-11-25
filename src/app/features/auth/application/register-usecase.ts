import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterPayload, User } from '../domain/auth.model';
import { AuthRepository } from '../domain/auth-repository';

@Service({ autoProvided: false })
export class RegisterUsecase {
  private readonly repo = inject(AuthRepository);

  execute(payload: RegisterPayload): Observable<User> {
    return this.repo.register(payload);
  }
}
