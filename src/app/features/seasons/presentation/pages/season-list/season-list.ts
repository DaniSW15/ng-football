import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { EmptyState, ErrorMessage, PageHeader } from '@shared';
import { CreateSeasonPayload } from '../../../domain/season-model';
import { SeasonCard } from '../../components/season-card/season-card';
import { SeasonForm } from '../../components/season-form/season-form';
import { SeasonsStore } from '../../state/seasons-store';

@Component({
  selector: 'app-season-list',
  standalone: true,
  imports: [SeasonCard, SeasonForm, PageHeader, EmptyState, ErrorMessage],
  templateUrl: './season-list.html',
  styleUrl: './season-list.scss',
})
export class SeasonList implements OnInit {
  protected readonly store = inject(SeasonsStore);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly createSeasonHandler = (
    payload: CreateSeasonPayload
  ): Promise<{ kind: string; message: string } | void> => {
    const competitionId = this.store.selectedCompetitionId();
    if (!competitionId) {
      return Promise.resolve({
        kind: 'missingCompetition',
        message: 'Selecciona una competición primero.',
      });
    }
    return this.store.createSeason(competitionId, payload);
  };

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const competitionId = params.get('competitionId');
        this.store.loadReferenceData(competitionId);
      });
  }

  onCompetitionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.store.selectCompetition(target.value);
  }

  onActivateSeason(seasonId: string): void {
    this.store.activateSeason(seasonId);
  }
}

export { SeasonList as SeasonListPage };
