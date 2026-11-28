import {
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { CreateTeamPayload } from '@teams/domain/team.model';
import { teamSchema } from '@teams/presentation/schemas/team.schema';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [FormField, FormRoot],
  templateUrl: './team-form.html',
  styles: [
    `
      .form-card {
        background: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 1.25rem;
        margin-block-end: 1.5rem;
        max-width: 440px;
      }
      h2 {
        margin: 0 0 1rem;
        font-size: 1.2rem;
        color: #1a1a2e;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      label {
        font-weight: 600;
        color: #1a1a2e;
      }
      .hint {
        color: #5f6368;
        font-size: 0.85rem;
      }
      input {
        font: inherit;
        font-size: max(1rem, 1em);
        min-height: 48px;
        padding: 0.6rem 0.75rem;
        border: 1px solid #767676;
        border-radius: 4px;
        box-sizing: border-box;
        background: #ffffff;
      }
      input:focus-visible {
        outline: 3px solid #0b57d0;
        outline-offset: 2px;
      }
      input:is(:user-invalid, [aria-invalid='true']) {
        border-color: #d93025;
        background-color: #fce8e6;
      }
      .error-hint {
        color: #b3261e;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 0.3rem;
      }
      button[type='submit'] {
        font: inherit;
        font-size: max(1rem, 1em);
        min-height: 48px;
        padding: 0.6rem 1.25rem;
        background: #1976d2;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
        align-self: flex-start;
      }
      button[type='submit']:focus-visible {
        outline: 3px solid #0b57d0;
        outline-offset: 2px;
      }
      button[type='submit']:disabled {
        background: #78909c;
        cursor: not-allowed;
      }
    `,
  ],
})
export class TeamForm {
  readonly submitTeam =
    input<
      ((payload: CreateTeamPayload) => Promise<{ kind: string; message: string } | void>) | null
    >(null);
  readonly teamCreated = output<CreateTeamPayload>();

  private readonly formElement =
    viewChild<ElementRef<HTMLFormElement>>('formEl');

  readonly teamModel = signal<CreateTeamPayload>({
    name: '',
  });

  readonly teamForm = form(this.teamModel, teamSchema, {
    submission: {
      action: async (field) => {
        const payload: CreateTeamPayload = {
          name: field().value().name.trim(),
        };

        const handler = this.submitTeam();
        if (handler) {
          const error = await handler(payload);
          if (!error) {
            this.teamModel.set({ name: '' });
            field().reset();
          }
          return error;
        }

        this.teamCreated.emit(payload);
        this.teamModel.set({ name: '' });
        field().reset();
        return undefined;
      },
      onInvalid: () => {
        queueMicrotask(() => {
          const firstInvalid = this.formElement()?.nativeElement.querySelector<
            HTMLElement
          >('[aria-invalid="true"]');
          firstInvalid?.focus();
        });
      },
    },
  });
}
