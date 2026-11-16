import { Component, inject, OnInit } from '@angular/core';
import { TeamsStore } from '../../state/teams-store';
import { TeamCard } from '../../components/team-card/team-card';
import { TeamForm } from '../../components/team-form/team-form';
import { CreateTeamPayload } from '../../../domain/team.model';
import { PageHeader, EmptyState, ErrorMessage } from '@shared';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [TeamCard, TeamForm, PageHeader, EmptyState, ErrorMessage],
  templateUrl: './team-list.page.html',
  styles: [
    `
      .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1rem;
      }
      .container {
        padding: 1rem 2rem;
      }
      .badge {
        display: inline-block;
        background: #e3f2fd;
        color: #1565c0;
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        font-size: 0.85rem;
        font-weight: 600;
      }
    `,
  ],
})
export class TeamListPage implements OnInit {
  protected readonly store = inject(TeamsStore);

  ngOnInit(): void {
    this.store.loadTeams();
  }

  onTeamCreated(payload: CreateTeamPayload): void {
    this.store.createTeam(payload);
  }
}
