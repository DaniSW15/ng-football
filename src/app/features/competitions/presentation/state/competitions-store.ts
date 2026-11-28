import { computed, inject, Service, signal } from '@angular/core';
import { CreateCompetitionUsecase } from '@competitions/application/create-competition-usecase';
import { GetCompetitionsUsecase } from '@competitions/application/get-competitions-usecase';
import { DeleteCompetitionUsecase } from '@competitions/application/delete-competition-usecase';
import { RenameCompetitionUsecase } from '@competitions/application/rename-competition-usecase';
import {
  Competition,
  CreateCompetitionPayload,
  RenameCompetitionPayload,
} from '@competitions/domain/competition-model';

export type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';

/**
 * Signal-based store para el Bounded Context de Competiciones.
 */
@Service({ autoProvided: false })
export class CompetitionsStore {
  private readonly getCompetitionsUC = inject(GetCompetitionsUsecase);
  private readonly createCompetitionUC = inject(CreateCompetitionUsecase);
  private readonly deleteCompetitionUC = inject(DeleteCompetitionUsecase);
  private readonly renameCompetitionUC = inject(RenameCompetitionUsecase);

  // --- State ---
  readonly competitions = signal<Competition[]>([]);
  readonly loadingState = signal<LoadingState>('idle');
  readonly error = signal<string | null>(null);

  // --- Computed ---
  readonly competitionCount = computed(() => this.competitions().length);
  readonly isLoading = computed(() => this.loadingState() === 'loading');

  // --- Actions ---
  loadCompetitions(): void {
    this.loadingState.set('loading');
    this.error.set(null);

    this.getCompetitionsUC.execute().subscribe({
      next: (competitions) => {
        this.competitions.set(competitions);
        this.loadingState.set('loaded');
      },
      error: (err) => {
        this.error.set(err.message);
        this.loadingState.set('error');
      },
    });
  }

  createCompetition(payload: CreateCompetitionPayload): void {
    // Si es internacional, countryCode se normaliza a null
    const normalizedPayload: CreateCompetitionPayload = {
      ...payload,
      countryCode:
        payload.scope === 'international' ? null : payload.countryCode,
    };

    this.createCompetitionUC.execute(normalizedPayload).subscribe({
      next: (competition) => {
        this.competitions.update((current) => [...current, competition]);
      },
      error: (err) => {
        this.error.set(err.message);
      },
    });
  }

  renameCompetition(id: string, payload: RenameCompetitionPayload): void {
    this.renameCompetitionUC.execute(id, payload).subscribe({
      next: (updated) => {
        this.competitions.update((current) =>
          current.map((c) => (c.id === id ? updated : c))
        );
      },
      error: (err) => {
        this.error.set(err.message);
      },
    });
  }

  deleteCompetition(id: string): void {
    this.deleteCompetitionUC.execute(id).subscribe({
      next: () => {
        this.competitions.update((current) => current.filter((c) => c.id !== id));
      },
      error: (err) => {
        this.error.set(err.message);
      },
    });
  }
}
