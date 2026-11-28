import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { ErrorMessage, PageHeader } from '@shared';
import { LoginPayload } from '@auth/domain/auth.model';
import { loginSchema } from '@auth/presentation/schemas/auth.schemas';
import { AuthStore } from '@auth/presentation/state/auth-store';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormField, FormRoot, RouterLink, PageHeader, ErrorMessage],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage implements OnInit {
  protected readonly store = inject(AuthStore);
  private readonly route = inject(ActivatedRoute);

  private readonly returnUrl =
    this.route.snapshot.queryParamMap.get('returnUrl') ?? '/teams';

  readonly loginModel = signal<LoginPayload>({
    email: '',
    password: '',
  });

  readonly loginForm = form(this.loginModel, loginSchema, {
    submission: {
      action: async (field) => {
        return this.store.login(field().value(), this.returnUrl);
      },
    },
  });

  ngOnInit(): void {
    this.store.error.set(null);
  }
}
