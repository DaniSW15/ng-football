import { Component, inject, OnInit } from '@angular/core';
import { CompetitionsStore } from '@competitions/presentation/state/competitions-store';
import { CreateCompetitionPayload } from '@competitions/domain/competition-model';
import { EmptyState, ErrorMessage, PageHeader } from '@shared';
import { CompetitionCard } from '@competitions/presentation/components/competition-card/competition-card';
import { CompetitionForm } from '@competitions/presentation/components/competition-form/competition-form';

@Component({
  selector: 'app-competition-list',
  standalone: true,
  imports: [
    CompetitionCard,
    CompetitionForm,
    PageHeader,
    EmptyState,
    ErrorMessage,
  ],
  templateUrl: './competition-list.html',
  styleUrl: './competition-list.scss',
})
export class CompetitionListPage implements OnInit {
  protected readonly store = inject(CompetitionsStore);

  ngOnInit(): void {
    this.store.loadCompetitions();
  }

  onCompetitionCreated(payload: CreateCompetitionPayload): void {
    this.store.createCompetition(payload);
  }

  onDeleteCompetition(id: string): void {
    this.store.deleteCompetition(id);
  }
}
