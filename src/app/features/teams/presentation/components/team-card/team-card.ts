import { Component, input } from '@angular/core';
import { Team } from '../../../domain/team.model';

@Component({
  selector: 'app-team-card',
  standalone: true,
  template: `
    <article class="team-card">
      <h3>{{ team().name }}</h3>
      <p>🌍 {{ team().country }}</p>
      <p>📅 Fundado en {{ team().foundedYear }}</p>
    </article>
  `,
  styles: [
    `
      .team-card {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 1rem;
        transition: box-shadow 0.2s;
      }
      .team-card:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
      }
    `,
  ],
})
export class TeamCard {
  readonly team = input.required<Team>();
}
