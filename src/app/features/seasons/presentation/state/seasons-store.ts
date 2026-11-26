import { computed, inject, Service, signal } from '@angular/core';
import { firstValueFrom, forkJoin } from 'rxjs';
import { Competition } from '@features/competitions/domain/competition-model';
import { GetCompetitionsUsecase } from '@features/competitions/application/get-competitions-usecase';
import { Team } from '@features/teams/domain/team.model';
import { GetTeamsUsecase } from '@features/teams/application/get-teams-usecase';
import {
  CreateSeasonPayload,
  Enrollment,
  EnrollTeamPayload,
  Season,
} from '../../domain/season-model';
import { GetSeasonsByCompetitionUsecase } from '../../application/get-seasons-by-competition-usecase';
import { GetSeasonUsecase } from '../../application/get-season-usecase';
import { CreateSeasonUsecase } from '../../application/create-season-usecase';
import { ActivateSeasonUsecase } from '../../application/activate-season-usecase';
import { GetEnrollmentsUsecase } from '../../application/get-enrollments-usecase';
import { EnrollTeamUsecase } from '../../application/enroll-team-usecase';

export type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';

/**
 * Signal-based store para el Bounded Context de Temporadas e Inscripciones.
 */
@Service({ autoProvided: false })
export class SeasonsStore {
  private readonly getSeasonsByCompetitionUC = inject(
    GetSeasonsByCompetitionUsecase
  );
  private readonly getSeasonUC = inject(GetSeasonUsecase);
  private readonly createSeasonUC = inject(CreateSeasonUsecase);
  private readonly activateSeasonUC = inject(ActivateSeasonUsecase);
  private readonly getEnrollmentsUC = inject(GetEnrollmentsUsecase);
  private readonly enrollTeamUC = inject(EnrollTeamUsecase);
  private readonly getCompetitionsUC = inject(GetCompetitionsUsecase);
  private readonly getTeamsUC = inject(GetTeamsUsecase);

  // --- State ---
  readonly competitions = signal<Competition[]>([]);
  readonly teams = signal<Team[]>([]);
  readonly selectedCompetitionId = signal<string | null>(null);
  readonly seasons = signal<Season[]>([]);
  readonly selectedSeason = signal<Season | null>(null);
  readonly enrollments = signal<Enrollment[]>([]);
  readonly loadingState = signal<LoadingState>('idle');
  readonly detailLoadingState = signal<LoadingState>('idle');
  readonly activatingSeasonId = signal<string | null>(null);
  readonly error = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  // --- Computed ---
  readonly seasonCount = computed(() => this.seasons().length);
  readonly enrollmentCount = computed(() => this.enrollments().length);
  readonly isLoading = computed(() => this.loadingState() === 'loading');
  readonly isDetailLoading = computed(
    () => this.detailLoadingState() === 'loading'
  );
  readonly selectedCompetition = computed(() => {
    const id = this.selectedCompetitionId();
    return this.competitions().find((c) => c.id === id) ?? null;
  });
  readonly teamById = computed(
    () => new Map(this.teams().map((team) => [team.id, team]))
  );
  readonly enrolledTeamIds = computed(
    () => new Set(this.enrollments().map((item) => item.teamId))
  );

  clearFeedback(): void {
    this.error.set(null);
    this.successMessage.set(null);
  }

  loadReferenceData(preferredCompetitionId?: string | null): void {
    this.error.set(null);

    this.getCompetitionsUC.execute().subscribe({
      next: (competitions) => {
        this.competitions.set(competitions);

        const targetId =
          preferredCompetitionId ??
          this.selectedCompetitionId() ??
          competitions[0]?.id ??
          null;

        if (targetId) {
          this.loadSeasonsByCompetition(targetId);
        } else {
          this.selectedCompetitionId.set(null);
          this.seasons.set([]);
        }
      },
      error: (err) => {
        this.error.set(err instanceof Error ? err.message : String(err));
      },
    });

    this.loadTeams();
  }

  loadTeams(): void {
    this.getTeamsUC.execute().subscribe({
      next: (teams) => {
        this.teams.set(teams);
      },
      error: () => {
        // Las inscripciones pueden seguir mostrándose con el teamId si falla el catálogo auxiliar
      },
    });
  }

  selectCompetition(competitionId: string): void {
    this.clearFeedback();
    if (!competitionId) {
      this.selectedCompetitionId.set(null);
      this.seasons.set([]);
      return;
    }
    this.loadSeasonsByCompetition(competitionId);
  }

  loadSeasonsByCompetition(competitionId: string): void {
    this.selectedCompetitionId.set(competitionId);
    this.loadingState.set('loading');
    this.error.set(null);

    this.getSeasonsByCompetitionUC.execute(competitionId).subscribe({
      next: (seasons) => {
        this.seasons.set(seasons);
        this.loadingState.set('loaded');
      },
      error: (err) => {
        this.error.set(err instanceof Error ? err.message : String(err));
        this.loadingState.set('error');
      },
    });
  }

  async createSeason(
    competitionId: string,
    payload: CreateSeasonPayload
  ): Promise<{ kind: string; message: string } | void> {
    this.clearFeedback();
    try {
      const created = await firstValueFrom(
        this.createSeasonUC.execute(competitionId, payload)
      );
      this.seasons.update((current) => [...current, created]);
      this.successMessage.set(`Temporada "${created.name}" creada en borrador.`);
      return;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'No se pudo crear la temporada.';
      this.error.set(message);
      return { kind: 'serverError', message };
    }
  }

  activateSeason(seasonId: string): void {
    this.clearFeedback();
    this.activatingSeasonId.set(seasonId);

    this.activateSeasonUC.execute(seasonId).subscribe({
      next: (updated) => {
        this.seasons.update((current) =>
          current.map((item) => (item.id === seasonId ? updated : item))
        );
        if (this.selectedSeason()?.id === seasonId) {
          this.selectedSeason.set(updated);
        }
        this.activatingSeasonId.set(null);
        this.successMessage.set(
          `Temporada "${updated.name}" activada correctamente.`
        );
      },
      error: (err) => {
        this.activatingSeasonId.set(null);
        this.error.set(err instanceof Error ? err.message : String(err));
      },
    });
  }

  loadSeasonDetail(seasonId: string): void {
    this.detailLoadingState.set('loading');
    this.clearFeedback();

    forkJoin({
      season: this.getSeasonUC.execute(seasonId),
      enrollments: this.getEnrollmentsUC.execute(seasonId),
    }).subscribe({
      next: ({ season, enrollments }) => {
        this.selectedSeason.set(season);
        this.selectedCompetitionId.set(season.competitionId);
        this.enrollments.set(enrollments);
        this.detailLoadingState.set('loaded');
      },
      error: (err) => {
        this.selectedSeason.set(null);
        this.enrollments.set([]);
        this.error.set(err instanceof Error ? err.message : String(err));
        this.detailLoadingState.set('error');
      },
    });

    if (this.competitions().length === 0) {
      this.getCompetitionsUC.execute().subscribe({
        next: (competitions) => this.competitions.set(competitions),
        error: () => {},
      });
    }

    if (this.teams().length === 0) {
      this.loadTeams();
    }
  }

  async enrollTeam(
    seasonId: string,
    payload: EnrollTeamPayload
  ): Promise<{ kind: string; message: string } | void> {
    this.clearFeedback();
    try {
      const enrollment = await firstValueFrom(
        this.enrollTeamUC.execute(seasonId, payload)
      );
      this.enrollments.update((current) => [...current, enrollment]);
      this.successMessage.set('Equipo inscrito en la temporada correctamente.');
      return;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'No se pudo inscribir el equipo.';
      this.error.set(message);
      return { kind: 'serverError', message };
    }
  }
}
