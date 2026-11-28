import { Service, inject, signal, computed } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  CreateTeamPayload,
  RenameTeamPayload,
  Team,
} from '@teams/domain/team.model';
import { GetTeamsUsecase } from '@teams/application/get-teams-usecase';
import { CreateTeamUsecase } from '@teams/application/create-team-usecase';
import { RenameTeamUsecase } from '@teams/application/rename-team-usecase';
import { DeleteTeamUsecase } from '@teams/application/delete-team-usecase';

export type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';

/**
 * Signal-based store — maneja estado reactivo de la feature Teams.
 * Solo conoce use cases, nunca HTTP directamente.
 */
@Service({ autoProvided: false })
export class TeamsStore {
  private readonly getTeamsUC = inject(GetTeamsUsecase);
  private readonly createTeamUC = inject(CreateTeamUsecase);
  private readonly renameTeamUC = inject(RenameTeamUsecase);
  private readonly deleteTeamUC = inject(DeleteTeamUsecase);

  // --- State ---
  readonly teams = signal<Team[]>([]);
  readonly loadingState = signal<LoadingState>('idle');
  readonly deletingTeamId = signal<string | null>(null);
  readonly error = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  // --- Computed ---
  readonly teamCount = computed(() => this.teams().length);
  readonly isLoading = computed(() => this.loadingState() === 'loading');

  clearFeedback(): void {
    this.error.set(null);
    this.successMessage.set(null);
  }

  // --- Actions ---
  loadTeams(): void {
    this.loadingState.set('loading');
    this.error.set(null);

    this.getTeamsUC.execute().subscribe({
      next: (teams) => {
        this.teams.set(teams);
        this.loadingState.set('loaded');
      },
      error: (err) => {
        this.error.set(err instanceof Error ? err.message : String(err));
        this.loadingState.set('error');
      },
    });
  }

  async createTeam(
    payload: CreateTeamPayload
  ): Promise<{ kind: string; message: string } | void> {
    this.clearFeedback();
    try {
      const team = await firstValueFrom(this.createTeamUC.execute(payload));
      this.teams.update((current) => [...current, team]);
      this.successMessage.set(`Equipo "${team.name}" creado correctamente.`);
      return;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'No se pudo crear el equipo.';
      this.error.set(message);
      return { kind: 'serverError', message };
    }
  }

  async renameTeam(
    id: string,
    payload: RenameTeamPayload
  ): Promise<{ kind: string; message: string } | void> {
    this.clearFeedback();
    try {
      const updated = await firstValueFrom(
        this.renameTeamUC.execute(id, payload)
      );
      this.teams.update((current) =>
        current.map((item) => (item.id === id ? updated : item))
      );
      this.successMessage.set(`Equipo renombrado a "${updated.name}".`);
      return;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'No se pudo renombrar el equipo.';
      this.error.set(message);
      return { kind: 'serverError', message };
    }
  }

  deleteTeam(id: string): void {
    this.clearFeedback();
    this.deletingTeamId.set(id);

    this.deleteTeamUC.execute(id).subscribe({
      next: () => {
        this.teams.update((current) => current.filter((item) => item.id !== id));
        this.deletingTeamId.set(null);
        this.successMessage.set('Equipo eliminado correctamente.');
      },
      error: (err) => {
        this.deletingTeamId.set(null);
        this.error.set(err instanceof Error ? err.message : String(err));
      },
    });
  }
}
