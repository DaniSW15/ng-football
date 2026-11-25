import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthStore } from './auth-store';
import { LoginUsecase } from '../../application/login-usecase';
import { RegisterUsecase } from '../../application/register-usecase';
import { LogoutUsecase } from '../../application/logout-usecase';
import { GetMeUsecase } from '../../application/get-me-usecase';
import { GetSessionsUsecase } from '../../application/get-sessions-usecase';
import { RevokeSessionUsecase } from '../../application/revoke-session-usecase';

describe('AuthStore', () => {
  let store: AuthStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        AuthStore,
        { provide: LoginUsecase, useValue: { execute: () => of() } },
        { provide: RegisterUsecase, useValue: { execute: () => of() } },
        { provide: LogoutUsecase, useValue: { execute: () => of(void 0) } },
        { provide: GetMeUsecase, useValue: { execute: () => of() } },
        { provide: GetSessionsUsecase, useValue: { execute: () => of([]) } },
        {
          provide: RevokeSessionUsecase,
          useValue: { execute: () => of(void 0) },
        },
      ],
    });
    store = TestBed.inject(AuthStore);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });
});
