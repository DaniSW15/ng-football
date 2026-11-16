import { Component, inject, output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CreateTeamPayload } from '../../../domain/team.model';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './team-form.html',
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        max-width: 400px;
        margin-bottom: 1.5rem;
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-weight: 500;
      }
      input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
      }
      input.ng-invalid.ng-touched {
        border-color: red;
      }
      button {
        padding: 0.6rem 1.2rem;
        background: #1976d2;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        align-self: flex-start;
      }
      button:disabled {
        background: #999;
        cursor: not-allowed;
      }
    `,
  ],
})
export class TeamForm {
  private readonly fb = inject(FormBuilder);

  readonly teamCreated = output<CreateTeamPayload>();

  readonly form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    country: ['', [Validators.required, Validators.minLength(2)]],
    foundedYear: [null, [Validators.required, Validators.min(1850), Validators.max(2030)]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.teamCreated.emit(this.form.value as CreateTeamPayload);
    this.form.reset();
  }
}
