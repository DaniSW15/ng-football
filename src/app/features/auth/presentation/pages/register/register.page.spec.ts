import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { RegisterPage } from './register.page';
import { AuthStore } from '@auth/presentation/state/auth-store';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPage],
      providers: [
        provideRouter([]),
        {
          provide: AuthStore,
          useValue: {
            error: signal(null),
            clearFeedback: () => {},
            register: async () => undefined,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and default role to viewer', () => {
    expect(component).toBeTruthy();
    expect(component.registerModel().role).toBe('viewer');
    expect(component.registerForm().invalid()).toBe(true);
  });
});
