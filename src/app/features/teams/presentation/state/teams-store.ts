import { Service, inject, signal, computed } from '@angular/core';
import { Team, CreateTeamPayload } from '../../domain/team.model';
import { GetTeamsUsecase } from '../../application/get-teams-usecase';
import { CreateTeamUsecase } from '../../application/create-team-usecase';

export type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';

/**
 * Signal-based store — maneja estado reactivo de la feature.
 * Solo conoce use cases, nunca HTTP directamente.
 */
@Service({ autoProvided: false })
export class TeamsStore {
  private readonly getTeamsUC = inject(GetTeamsUsecase);
  private readonly createTeamUC = inject(CreateTeamUsecase);

  // --- State ---
  readonly teams = signal<Team[]>([]);
  readonly loadingState = signal<LoadingState>('idle');
  readonly error = signal<string | null>(null);

  // --- Computed ---
  readonly teamCount = computed(() => this.teams().length);
  readonly isLoading = computed(() => this.loadingState() === 'loading');

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
        this.error.set(err.message);
        this.loadingState.set('error');
      },
    });
  }

  createTeam(payload: CreateTeamPayload): void {
    this.createTeamUC.execute(payload).subscribe({
      next: (team) => {
        this.teams.update((current) => [...current, team]);
      },
      error: (err) => {
        this.error.set(err.message);
      },
    });
  }
}
