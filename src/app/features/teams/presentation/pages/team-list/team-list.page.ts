import { Component, inject, OnInit } from '@angular/core';
import { TeamsStore } from '../../state/teams-store';
import { TeamCard } from '../../components/team-card/team-card';
import { TeamForm } from '../../components/team-form/team-form';
import { CreateTeamPayload, RenameTeamPayload } from '../../../domain/team.model';
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
      .success-box {
        padding: 0.75rem 1rem;
        background: #e8f5e9;
        border: 1px solid #a5d6a7;
        border-radius: 6px;
        color: #1b5e20;
        margin-block-end: 1rem;
        font-weight: 500;
      }
    `,
  ],
})
export class TeamListPage implements OnInit {
  protected readonly store = inject(TeamsStore);

  readonly createTeamHandler = (
    payload: CreateTeamPayload
  ): Promise<{ kind: string; message: string } | void> => {
    return this.store.createTeam(payload);
  };

  readonly renameTeamHandler = (
    id: string,
    payload: RenameTeamPayload
  ): Promise<{ kind: string; message: string } | void> => {
    return this.store.renameTeam(id, payload);
  };

  ngOnInit(): void {
    this.store.loadTeams();
  }

  onDeleteTeam(id: string): void {
    this.store.deleteTeam(id);
  }
}
