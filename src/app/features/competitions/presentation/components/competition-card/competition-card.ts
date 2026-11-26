import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Competition, CompetitionType, CompetitionScope } from '../../../domain/competition-model';

@Component({
  selector: 'app-competition-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './competition-card.html',
  styleUrl: './competition-card.scss',
})
export class CompetitionCard {
  readonly competition = input.required<Competition>();
  readonly delete = output<string>();

  getTypeLabel(type: CompetitionType): string {
    const labels: Record<CompetitionType, string> = {
      league: '🏆 Liga',
      cup: '🥇 Copa',
      super_cup: '⭐ Supercopa',
      tournament: '🌍 Torneo',
    };
    return labels[type] ?? type;
  }

  getScopeLabel(scope: CompetitionScope): string {
    return scope === 'domestic' ? 'Nacional' : 'Internacional';
  }

  onDelete(): void {
    if (confirm(`¿Eliminar la competición "${this.competition().name}"?`)) {
      this.delete.emit(this.competition().id);
    }
  }
}
