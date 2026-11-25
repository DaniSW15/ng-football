import { computed, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import type {
  AuthSessionResult,
  User,
  UserRole,
} from '@features/auth/domain/auth.model';

const ACCESS_TOKEN_KEY = 'ng_football_access_token';
const REFRESH_TOKEN_KEY = 'ng_football_refresh_token';
const USER_KEY = 'ng_football_user';

/**
 * Servicio global de sesión autenticada.
 * Almacena tokens JWT y perfil del usuario en Signals + localStorage.
 */
@Service()
export class AuthSessionService {
  private readonly _accessToken = signal<string | null>(
    this.readStorage(ACCESS_TOKEN_KEY)
  );
  private readonly _refreshToken = signal<string | null>(
    this.readStorage(REFRESH_TOKEN_KEY)
  );
  private readonly _user = signal<User | null>(this.readUserStorage());

  readonly accessToken = this._accessToken.asReadonly();
  readonly refreshToken = this._refreshToken.asReadonly();
  readonly user = this._user.asReadonly();

  readonly isAuthenticated = computed(
    () => Boolean(this._accessToken() && this._user())
  );
  readonly userRole = computed<UserRole | null>(
    () => this._user()?.role ?? null
  );
  readonly isAdmin = computed(() => this._user()?.role === 'admin');

  /** Bloqueo compartido para deduplicar múltiples 401 concurrentes */
  refreshInFlight$: Observable<AuthSessionResult> | null = null;

  setSession(result: AuthSessionResult): void {
    this._accessToken.set(result.tokens.accessToken);
    this._refreshToken.set(result.tokens.refreshToken);
    this._user.set(result.user);

    this.writeStorage(ACCESS_TOKEN_KEY, result.tokens.accessToken);
    this.writeStorage(REFRESH_TOKEN_KEY, result.tokens.refreshToken);
    this.writeStorage(USER_KEY, JSON.stringify(result.user));
  }

  setUser(user: User): void {
    this._user.set(user);
    this.writeStorage(USER_KEY, JSON.stringify(user));
  }

  clearSession(): void {
    this._accessToken.set(null);
    this._refreshToken.set(null);
    this._user.set(null);
    this.refreshInFlight$ = null;

    this.removeStorage(ACCESS_TOKEN_KEY);
    this.removeStorage(REFRESH_TOKEN_KEY);
    this.removeStorage(USER_KEY);
  }

  private readStorage(key: string): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    return localStorage.getItem(key);
  }

  private readUserStorage(): User | null {
    const raw = this.readStorage(USER_KEY);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  private writeStorage(key: string, value: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  private removeStorage(key: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}
