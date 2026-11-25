import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../domain/auth.model';
import { AuthRepository } from '../domain/auth-repository';

@Service({ autoProvided: false })
export class GetMeUsecase {
  private readonly repo = inject(AuthRepository);

  execute(): Observable<User> {
    return this.repo.getMe();
  }
}
