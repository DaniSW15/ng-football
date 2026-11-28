import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { authInterceptor } from './auth-interceptor';
import { AuthSessionService } from '../services/auth-session';
import { AuthRepository } from '@auth/domain/auth-repository';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpTesting: HttpTestingController;
  let session: AuthSessionService;

  const mockRefreshResult = {
    tokens: {
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
      tokenType: 'bearer',
      expiresIn: 900,
    },
    user: {
      id: 'u1',
      email: 'scout@football.com',
      fullName: 'Chief Scout',
      role: 'analyst' as const,
      isActive: true,
      createdAt: '2026-11-25T01:00:00Z',
    },
  };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        {
          provide: AuthRepository,
          useValue: {
            refresh: () => of(mockRefreshResult),
          },
        },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
    session = TestBed.inject(AuthSessionService);
  });

  afterEach(() => {
    httpTesting.verify();
    localStorage.clear();
  });

  it('should attach Authorization header on protected requests when authenticated', () => {
    session.setSession({
      ...mockRefreshResult,
      tokens: { ...mockRefreshResult.tokens, accessToken: 'token-123' },
    });

    http.get('/competitions').subscribe();

    const req = httpTesting.expectOne('/competitions');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token-123');
    req.flush([]);
  });

  it('should not attach Authorization header on /auth/login', () => {
    session.setSession(mockRefreshResult);

    http.post('/auth/login', {}).subscribe();

    const req = httpTesting.expectOne('/auth/login');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('should refresh token and retry original request on 401', () => {
    session.setSession({
      ...mockRefreshResult,
      tokens: {
        ...mockRefreshResult.tokens,
        accessToken: 'expired-token',
        refreshToken: 'valid-refresh',
      },
    });

    let responseData: unknown;
    http.get('/auth/me').subscribe((res) => {
      responseData = res;
    });

    const firstReq = httpTesting.expectOne('/auth/me');
    expect(firstReq.request.headers.get('Authorization')).toBe(
      'Bearer expired-token'
    );
    firstReq.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    const retryReq = httpTesting.expectOne('/auth/me');
    expect(retryReq.request.headers.get('Authorization')).toBe(
      'Bearer new-access-token'
    );
    retryReq.flush({ id: 'u1' });

    expect(responseData).toEqual({ id: 'u1' });
    expect(session.accessToken()).toBe('new-access-token');
  });
});
