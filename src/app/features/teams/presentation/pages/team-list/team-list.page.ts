import { Component, inject, OnInit } from '@angular/core';
import { TeamsStore } from '../../state/teams-store';
import { TeamCard } from '../../components/team-card/team-card';
import { TeamForm } from '../../components/team-form/team-form';
import { CreateTeamPayload } from '../../../domain/team.model';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [TeamCard, TeamForm],
  templateUrl: './team-list.page.html',
  styles: [
    `
      .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1rem;
      }
      .error {
        color: red;
      }
      .container {
        padding: 1rem 2rem;
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
