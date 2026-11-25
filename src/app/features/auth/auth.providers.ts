import { Provider } from '@angular/core';
import { AuthRepository } from './domain/auth-repository';
import { AuthHttpAdapter } from './infrastructure/auth-http-adapter';
import { RegisterUsecase } from './application/register-usecase';
import { LoginUsecase } from './application/login-usecase';
import { LogoutUsecase } from './application/logout-usecase';
import { GetMeUsecase } from './application/get-me-usecase';
import { GetSessionsUsecase } from './application/get-sessions-usecase';
import { RevokeSessionUsecase } from './application/revoke-session-usecase';
import { AuthStore } from './presentation/state/auth-store';

/**
 * Providers de Identity & Auth.
 * Se registran en app.config.ts para que navbar, authInterceptor y páginas lazy
 * compartan el mismo puerto, casos de uso y AuthStore.
 */
export const AUTH_PROVIDERS: Provider[] = [
  { provide: AuthRepository, useClass: AuthHttpAdapter },
  RegisterUsecase,
  LoginUsecase,
  LogoutUsecase,
  GetMeUsecase,
  GetSessionsUsecase,
  RevokeSessionUsecase,
  AuthStore,
];
