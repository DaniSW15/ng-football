import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthHttpAdapter } from './auth-http-adapter';

describe('AuthHttpAdapter', () => {
  let adapter: AuthHttpAdapter;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthHttpAdapter,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    adapter = TestBed.inject(AuthHttpAdapter);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  it('should map login request and response DTOs accurately without extra fields', () => {
    let result: unknown;
    adapter
      .login({ email: ' scout@football.com ', password: 'secret' })
      .subscribe((res) => (result = res));

    const req = httpTesting.expectOne('/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email: 'scout@football.com',
      password: 'secret',
    });

    req.flush({
      access_token: 'jwt-token',
      refresh_token: 'rft-token',
      token_type: 'bearer',
      expires_in: 900,
      user: {
        id: 'u-1',
        email: 'scout@football.com',
        full_name: 'Chief Scout',
        role: 'analyst',
        is_active: true,
        created_at: '2026-11-25T01:00:00Z',
      },
    });

    expect(result).toEqual({
      tokens: {
        accessToken: 'jwt-token',
        refreshToken: 'rft-token',
        tokenType: 'bearer',
        expiresIn: 900,
      },
      user: {
        id: 'u-1',
        email: 'scout@football.com',
        fullName: 'Chief Scout',
        role: 'analyst',
        isActive: true,
        createdAt: '2026-11-25T01:00:00Z',
      },
    });
  });

  it('should call DELETE /auth/sessions/{id} on revokeSession', () => {
    adapter.revokeSession('sess-123').subscribe();

    const req = httpTesting.expectOne('/auth/sessions/sess-123');
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 204, statusText: 'No Content' });
  });
});
