import { Observable } from 'rxjs';
import {
  AuthSession,
  AuthSessionResult,
  LoginPayload,
  RegisterPayload,
  User,
} from './auth.model';

/**
 * Puerto abstracto del dominio para Identity & Auth (/api/v1/auth).
 */
export abstract class AuthRepository {
  abstract register(payload: RegisterPayload): Observable<User>;
  abstract login(payload: LoginPayload): Observable<AuthSessionResult>;
  abstract refresh(refreshToken: string): Observable<AuthSessionResult>;
  abstract logout(): Observable<void>;
  abstract getMe(): Observable<User>;
  abstract getSessions(): Observable<AuthSession[]>;
  abstract revokeSession(sessionId: string): Observable<void>;
}
