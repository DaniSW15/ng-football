import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmptyState, ErrorMessage, PageHeader } from '@shared';
import { EnrollTeamPayload } from '../../../domain/season-model';
import { formatCalendarDate } from '../../../domain/season-date.utils';
import { getSeasonStatusLabel } from '../../../domain/season-status.utils';
import { EnrollmentForm } from '../../components/enrollment-form/enrollment-form';
import { SeasonsStore } from '../../state/seasons-store';

@Component({
  selector: 'app-season-detail',
  standalone: true,
  imports: [DatePipe, RouterLink, PageHeader, ErrorMessage, EmptyState, EnrollmentForm],
  templateUrl: './season-detail.html',
  styleUrl: './season-detail.scss',
})
export class SeasonDetailPage implements OnInit {
  protected readonly store = inject(SeasonsStore);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly confirmingActivate = signal(false);
  private readonly seasonId = signal<string>('');

  readonly competitionName = computed(() => {
    const season = this.store.selectedSeason();
    if (!season) {
      return null;
    }
    return (
      this.store.competitions().find((c) => c.id === season.competitionId)?.name ??
      null
    );
  });

  readonly backRoute = computed(() => {
    const season = this.store.selectedSeason();
    return season ? ['/competitions', season.competitionId, 'seasons'] : ['/seasons'];
  });

  readonly enrollTeamHandler = (
    payload: EnrollTeamPayload
  ): Promise<{ kind: string; message: string } | void> => {
    const currentId = this.seasonId();
    if (!currentId) {
      return Promise.resolve({
        kind: 'missingSeason',
        message: 'No se encontró el identificador de la temporada.',
      });
    }
    return this.store.enrollTeam(currentId, payload);
  };

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params.get('seasonId');
        if (id) {
          this.seasonId.set(id);
          this.confirmingActivate.set(false);
          this.store.loadSeasonDetail(id);
        }
      });
  }

  formatDate(isoDate: string): string {
    return formatCalendarDate(isoDate);
  }

  getStatusLabel(): string {
    const season = this.store.selectedSeason();
    return season ? getSeasonStatusLabel(season.status) : '';
  }

  getTeamDisplay(teamId: string): string {
    const team = this.store.teamById().get(teamId);
    return team ? team.name : teamId;
  }

  startConfirm(): void {
    this.confirmingActivate.set(true);
  }

  cancelConfirm(): void {
    this.confirmingActivate.set(false);
  }

  confirmActivate(seasonId: string): void {
    this.confirmingActivate.set(false);
    this.store.activateSeason(seasonId);
  }
}
