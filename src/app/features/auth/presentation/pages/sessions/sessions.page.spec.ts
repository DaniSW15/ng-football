import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { SessionsPage } from './sessions.page';
import { AuthStore } from '../../state/auth-store';

describe('SessionsPage', () => {
  let component: SessionsPage;
  let fixture: ComponentFixture<SessionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionsPage],
      providers: [
        {
          provide: AuthStore,
          useValue: {
            user: signal(null),
            sessions: signal([]),
            activeSessionsCount: signal(0),
            isLoading: signal(false),
            error: signal(null),
            loadMe: () => {},
            loadSessions: () => {},
            revokeSession: () => {},
            logout: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
