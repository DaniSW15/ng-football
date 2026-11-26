import {
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { RenameTeamPayload, Team } from '../../../domain/team.model';
import { renameTeamSchema } from '../../schemas/team.schema';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [DatePipe, FormField, FormRoot],
  template: `
    <article class="team-card">
      @if (editing()) {
        <form
          #renameFormEl
          [formRoot]="renameForm"
          class="rename-form"
          novalidate
        >
          <div class="field">
            <label [for]="'rename-team-' + team().id">
              Nuevo nombre <span aria-hidden="true">*</span>
            </label>
            <span [id]="'rename-hint-' + team().id" class="hint">
              Entre 1 y 100 caracteres
            </span>
            @let renameInvalid =
              renameForm.name().invalid() && renameForm.name().touched();
            <input
              [id]="'rename-team-' + team().id"
              type="text"
              [formField]="renameForm.name"
              [attr.aria-invalid]="renameInvalid ? 'true' : 'false'"
              [attr.aria-describedby]="
                renameInvalid
                  ? 'rename-hint-' + team().id + ' rename-error-' + team().id
                  : 'rename-hint-' + team().id
              "
            />
            @if (renameInvalid) {
              <span [id]="'rename-error-' + team().id" class="error-hint">
                <span role="img" aria-label="Error">❌</span>
                {{ renameForm.name().errors()[0]?.message ?? 'Nombre inválido.' }}
              </span>
            }
          </div>
          <div class="action-row">
            <button
              type="submit"
              class="btn-save"
              [disabled]="renameForm().submitting()"
            >
              {{ renameForm().submitting() ? 'Guardando...' : 'Guardar' }}
            </button>
            <button
              type="button"
              class="btn-cancel"
              [disabled]="renameForm().submitting()"
              (click)="cancelEdit()"
            >
              Cancelar
            </button>
          </div>
        </form>
      } @else {
        <div class="card-header">
          <h3>{{ team().name }}</h3>
        </div>
        <p class="meta">🕒 Creado: {{ team().createdAt | date: 'short' }}</p>

        <div class="action-row">
          <button type="button" class="btn-rename" (click)="startEdit()">
            ✏️ Renombrar
          </button>

          @if (confirmingDelete()) {
            <button
              type="button"
              class="btn-confirm-delete"
              [disabled]="deleting()"
              (click)="confirmDelete()"
            >
              {{ deleting() ? 'Eliminando...' : 'Confirmar eliminación' }}
            </button>
            <button
              type="button"
              class="btn-cancel"
              [disabled]="deleting()"
              (click)="cancelDelete()"
            >
              Cancelar
            </button>
          } @else {
            <button
              type="button"
              class="btn-delete"
              [disabled]="deleting()"
              (click)="startDelete()"
            >
              🗑️ Eliminar
            </button>
          }
        </div>
      }

      <footer class="card-footer">
        <small>ID: {{ team().id.slice(0, 8) }}...</small>
      </footer>
    </article>
  `,
  styles: [
    `
      .team-card {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 1rem;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        transition: box-shadow 0.2s;
      }
      .team-card:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
      }
      .card-header h3 {
        margin: 0;
        color: #1a1a2e;
        font-size: 1.15rem;
      }
      .meta {
        margin: 0;
        color: #546e7a;
        font-size: 0.85rem;
      }
      .rename-form,
      .field {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
      }
      label {
        font-weight: 600;
        font-size: 0.9rem;
        color: #1a1a2e;
      }
      .hint {
        color: #5f6368;
        font-size: 0.8rem;
      }
      input {
        font: inherit;
        font-size: max(1rem, 1em);
        min-height: 44px;
        padding: 0.5rem 0.65rem;
        border: 1px solid #767676;
        border-radius: 4px;
        box-sizing: border-box;
      }
      input:focus-visible,
      button:focus-visible {
        outline: 3px solid #0b57d0;
        outline-offset: 2px;
      }
      input:is(:user-invalid, [aria-invalid='true']) {
        border-color: #d93025;
        background-color: #fce8e6;
      }
      .error-hint {
        color: #b3261e;
        font-size: 0.85rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .action-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      button {
        font: inherit;
        font-size: 0.875rem;
        min-height: 40px;
        padding: 0.35rem 0.75rem;
        border: none;
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
      }
      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .btn-rename {
        background: #eceff1;
        color: #1a1a2e;
      }
      .btn-save {
        background: #1976d2;
        color: #ffffff;
      }
      .btn-delete {
        background: #fdecea;
        color: #b3261e;
      }
      .btn-confirm-delete {
        background: #c62828;
        color: #ffffff;
      }
      .btn-cancel {
        background: #e0e0e0;
        color: #1a1a2e;
      }
      .card-footer {
        margin-top: auto;
        padding-top: 0.5rem;
        border-top: 1px solid #f0f0f0;
        color: #78909c;
        font-size: 0.75rem;
      }
    `,
  ],
})
export class TeamCard {
  readonly team = input.required<Team>();
  readonly deleting = input(false);
  readonly submitRename =
    input<
      ((id: string, payload: RenameTeamPayload) => Promise<{ kind: string; message: string } | void>) | null
    >(null);
  readonly delete = output<string>();

  private readonly renameFormElement =
    viewChild<ElementRef<HTMLFormElement>>('renameFormEl');

  readonly editing = signal(false);
  readonly confirmingDelete = signal(false);
  readonly renameModel = signal<RenameTeamPayload>({ name: '' });

  readonly renameForm = form(this.renameModel, renameTeamSchema, {
    submission: {
      action: async (field) => {
        const payload: RenameTeamPayload = {
          name: field().value().name.trim(),
        };
        const handler = this.submitRename();
        if (handler) {
          const error = await handler(this.team().id, payload);
          if (!error) {
            this.editing.set(false);
          }
          return error;
        }
        this.editing.set(false);
        return undefined;
      },
      onInvalid: () => {
        queueMicrotask(() => {
          const firstInvalid =
            this.renameFormElement()?.nativeElement.querySelector<HTMLElement>(
              '[aria-invalid="true"]'
            );
          firstInvalid?.focus();
        });
      },
    },
  });

  startEdit(): void {
    this.confirmingDelete.set(false);
    this.renameModel.set({ name: this.team().name });
    this.editing.set(true);
  }

  cancelEdit(): void {
    this.editing.set(false);
  }

  startDelete(): void {
    this.confirmingDelete.set(true);
  }

  cancelDelete(): void {
    this.confirmingDelete.set(false);
  }

  confirmDelete(): void {
    this.confirmingDelete.set(false);
    this.delete.emit(this.team().id);
  }
}
