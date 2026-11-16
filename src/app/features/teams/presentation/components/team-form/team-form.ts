import { Component, output, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { CreateTeamPayload } from '../../../domain/team.model';
import { teamSchema } from '../../schemas/team.schema';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [FormField, FormRoot],
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
      .error-hint {
        color: #d32f2f;
        font-size: 0.85rem;
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
  readonly teamCreated = output<CreateTeamPayload>();

  readonly teamModel = signal<CreateTeamPayload>({
    name: '',
    country: '',
    foundedYear: 1900,
  });

  // El formulario consume el esquema componible desacoplado
  readonly teamForm = form(this.teamModel, teamSchema, {
    submission: {
      action: async (field) => {
        this.teamCreated.emit(field().value());
        this.teamModel.set({
          name: '',
          country: '',
          foundedYear: 1900,
        });
      },
    },
  });
}
