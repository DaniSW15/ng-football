import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LoginPage } from './login.page';
import { AuthStore } from '@auth/presentation/state/auth-store';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        provideRouter([]),
        {
          provide: AuthStore,
          useValue: {
            error: signal(null),
            successMessage: signal(null),
            login: async () => undefined,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and start with invalid form', () => {
    expect(component).toBeTruthy();
    expect(component.loginForm().invalid()).toBe(true);
  });
});
