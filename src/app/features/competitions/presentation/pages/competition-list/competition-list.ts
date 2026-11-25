import { Component, inject, OnInit } from '@angular/core';
import { CompetitionsStore } from '../../state/competitions-store';
import { CreateCompetitionPayload } from '../../../domain/competition-model';
import { EmptyState, ErrorMessage, PageHeader } from '@shared';
import { CompetitionCard } from '../../components/competition-card/competition-card';
import { CompetitionForm } from '../../components/competition-form/competition-form';

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
