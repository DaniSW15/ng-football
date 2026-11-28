import { Provider } from '@angular/core';
import { AuthRepository } from '@auth/domain/auth-repository';
import { AuthHttpAdapter } from '@auth/infrastructure/auth-http-adapter';
import { RegisterUsecase } from '@auth/application/register-usecase';
import { LoginUsecase } from '@auth/application/login-usecase';
import { LogoutUsecase } from '@auth/application/logout-usecase';
import { GetMeUsecase } from '@auth/application/get-me-usecase';
import { GetSessionsUsecase } from '@auth/application/get-sessions-usecase';
import { RevokeSessionUsecase } from '@auth/application/revoke-session-usecase';
import { AuthStore } from '@auth/presentation/state/auth-store';

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
