import { computed, inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthSessionService } from '@core';
import {
  AuthSession,
  LoginPayload,
  RegisterPayload,
} from '@auth/domain/auth.model';
import { GetMeUsecase } from '@auth/application/get-me-usecase';
import { GetSessionsUsecase } from '@auth/application/get-sessions-usecase';
import { LoginUsecase } from '@auth/application/login-usecase';
import { LogoutUsecase } from '@auth/application/logout-usecase';
import { RegisterUsecase } from '@auth/application/register-usecase';
import { RevokeSessionUsecase } from '@auth/application/revoke-session-usecase';

export type AuthLoadingState = 'idle' | 'loading' | 'loaded' | 'error';

/**
 * Signal Store de Identity & Auth.
 * Orquesta login, registro, logout, perfil (/auth/me) y gestión de sesiones.
 */
@Service({ autoProvided: false })
export class AuthStore {
  private readonly loginUC = inject(LoginUsecase);
  private readonly registerUC = inject(RegisterUsecase);
  private readonly logoutUC = inject(LogoutUsecase);
  private readonly getMeUC = inject(GetMeUsecase);
  private readonly getSessionsUC = inject(GetSessionsUsecase);
  private readonly revokeSessionUC = inject(RevokeSessionUsecase);
  private readonly session = inject(AuthSessionService);
  private readonly router = inject(Router);

  // --- State ---
  readonly sessions = signal<AuthSession[]>([]);
  readonly loadingState = signal<AuthLoadingState>('idle');
  readonly error = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  // --- Computed / Session Signals ---
  readonly user = this.session.user;
  readonly isAuthenticated = this.session.isAuthenticated;
  readonly isAdmin = this.session.isAdmin;
  readonly isLoading = computed(() => this.loadingState() === 'loading');
  readonly activeSessionsCount = computed(
    () => this.sessions().filter((s) => s.isActive).length
  );

  clearFeedback(): void {
    this.error.set(null);
    this.successMessage.set(null);
  }

  async login(
    payload: LoginPayload,
    returnUrl = '/teams'
  ): Promise<{ kind: string; message: string } | void> {
    this.clearFeedback();
    try {
      const result = await firstValueFrom(this.loginUC.execute(payload));
      this.session.setSession(result);
      await this.router.navigateByUrl(returnUrl);
      return;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'No se pudo iniciar sesión.';
      this.error.set(message);
      return { kind: 'serverError', message };
    }
  }

  async register(
    payload: RegisterPayload
  ): Promise<{ kind: string; message: string } | void> {
    this.clearFeedback();
    try {
      const user = await firstValueFrom(this.registerUC.execute(payload));
      this.successMessage.set(
        `Cuenta creada para ${user.email}. Inicia sesión para continuar.`
      );
      await this.router.navigate(['/auth/login']);
      return;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'No se pudo completar el registro.';
      this.error.set(message);
      return { kind: 'serverError', message };
    }
  }

  logout(): void {
    this.clearFeedback();
    this.logoutUC.execute().subscribe({
      next: () => this.finishLogout(),
      error: () => this.finishLogout(),
    });
  }

  loadMe(): void {
    this.getMeUC.execute().subscribe({
      next: (user) => {
        this.session.setUser(user);
      },
      error: (err) => {
        this.error.set(err.message);
      },
    });
  }

  loadSessions(): void {
    this.loadingState.set('loading');
    this.error.set(null);

    this.getSessionsUC.execute().subscribe({
      next: (sessions) => {
        this.sessions.set(sessions);
        this.loadingState.set('loaded');
      },
      error: (err) => {
        this.error.set(err.message);
        this.loadingState.set('error');
      },
    });
  }

  revokeSession(sessionId: string): void {
    this.error.set(null);
    this.revokeSessionUC.execute(sessionId).subscribe({
      next: () => {
        this.sessions.update((current) =>
          current.filter((item) => item.id !== sessionId)
        );
      },
      error: (err) => {
        this.error.set(err.message);
      },
    });
  }

  private finishLogout(): void {
    this.session.clearSession();
    this.sessions.set([]);
    void this.router.navigate(['/auth/login']);
  }
}
