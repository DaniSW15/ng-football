import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { provideRouter } from '@angular/router';
import { authGuard, guestGuard } from './auth-guard';
import { AuthSessionService } from '../services/auth-session';

describe('authGuard & guestGuard', () => {
  let session: AuthSessionService;
  let router: Router;
  const dummyRoute = {} as ActivatedRouteSnapshot;
  const dummyState = { url: '/auth/sessions' } as RouterStateSnapshot;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
    session = TestBed.inject(AuthSessionService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('authGuard redirects unauthenticated users to /auth/login with returnUrl', () => {
    const result = TestBed.runInInjectionContext(() =>
      authGuard(dummyRoute, dummyState)
    );
    expect(result instanceof UrlTree).toBe(true);
    expect(router.serializeUrl(result as UrlTree)).toBe(
      '/auth/login?returnUrl=%2Fauth%2Fsessions'
    );
  });

  it('authGuard allows authenticated users', () => {
    session.setSession({
      tokens: {
        accessToken: 'abc',
        refreshToken: 'def',
        tokenType: 'bearer',
        expiresIn: 900,
      },
      user: {
        id: 'u1',
        email: 'a@b.com',
        fullName: 'Test',
        role: 'viewer',
        isActive: true,
        createdAt: '2026-11-25T01:00:00Z',
      },
    });

    const result = TestBed.runInInjectionContext(() =>
      authGuard(dummyRoute, dummyState)
    );
    expect(result).toBe(true);
  });

  it('guestGuard allows unauthenticated users', () => {
    const result = TestBed.runInInjectionContext(() =>
      guestGuard(dummyRoute, dummyState)
    );
    expect(result).toBe(true);
  });
});
