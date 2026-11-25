import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthRepository } from '../domain/auth-repository';
import {
  AuthSession,
  AuthSessionResult,
  LoginPayload,
  RegisterPayload,
  User,
} from '../domain/auth.model';
import {
  AuthTokenResponseDto,
  SessionResponseDto,
  UserResponseDto,
} from './dtos/auth-api.dto';
import { AuthApiMapper } from './auth-api-mapper';

/**
 * Adaptador HTTP para /api/v1/auth.
 * Implementa el puerto AuthRepository.
 */
@Service({ autoProvided: false })
export class AuthHttpAdapter extends AuthRepository {
  private readonly http = inject(HttpClient);

  override register(payload: RegisterPayload): Observable<User> {
    const dto = AuthApiMapper.toRegisterDto(payload);
    return this.http
      .post<UserResponseDto>('/auth/register', dto)
      .pipe(map(AuthApiMapper.userToDomain));
  }

  override login(payload: LoginPayload): Observable<AuthSessionResult> {
    const dto = AuthApiMapper.toLoginDto(payload);
    return this.http
      .post<AuthTokenResponseDto>('/auth/login', dto)
      .pipe(map(AuthApiMapper.authTokenToDomain));
  }

  override refresh(refreshToken: string): Observable<AuthSessionResult> {
    const dto = AuthApiMapper.toRefreshDto(refreshToken);
    return this.http
      .post<AuthTokenResponseDto>('/auth/refresh', dto)
      .pipe(map(AuthApiMapper.authTokenToDomain));
  }

  override logout(): Observable<void> {
    return this.http.post<void>('/auth/logout', {});
  }

  override getMe(): Observable<User> {
    return this.http
      .get<UserResponseDto>('/auth/me')
      .pipe(map(AuthApiMapper.userToDomain));
  }

  override getSessions(): Observable<AuthSession[]> {
    return this.http
      .get<SessionResponseDto[]>('/auth/sessions')
      .pipe(map((dtos) => dtos.map(AuthApiMapper.sessionToDomain)));
  }

  override revokeSession(sessionId: string): Observable<void> {
    return this.http.delete<void>(`/auth/sessions/${sessionId}`);
  }
}
