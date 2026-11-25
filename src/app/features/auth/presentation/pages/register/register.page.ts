import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { ErrorMessage, PageHeader } from '@shared';
import { RegisterPayload, USER_ROLES } from '../../../domain/auth.model';
import { registerSchema } from '../../schemas/auth.schemas';
import { AuthStore } from '../../state/auth-store';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormField, FormRoot, RouterLink, PageHeader, ErrorMessage],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
})
export class RegisterPage implements OnInit {
  protected readonly store = inject(AuthStore);
  protected readonly roles = USER_ROLES;

  readonly registerModel = signal<RegisterPayload>({
    email: '',
    password: '',
    fullName: '',
    role: 'viewer',
  });

  readonly registerForm = form(this.registerModel, registerSchema, {
    submission: {
      action: async (field) => {
        return this.store.register(field().value());
      },
    },
  });

  ngOnInit(): void {
    this.store.clearFeedback();
  }
}
