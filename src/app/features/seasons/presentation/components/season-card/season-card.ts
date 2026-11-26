import { Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Season } from '../../../domain/season-model';
import { formatCalendarDate } from '../../../domain/season-date.utils';
import { getSeasonStatusLabel } from '../../../domain/season-status.utils';

@Component({
  selector: 'app-season-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './season-card.html',
  styleUrl: './season-card.scss',
})
export class SeasonCard {
  readonly season = input.required<Season>();
  readonly activating = input(false);
  readonly activate = output<string>();

  readonly confirmingActivate = signal(false);

  formatDate(isoDate: string): string {
    return formatCalendarDate(isoDate);
  }

  getStatusLabel(): string {
    return getSeasonStatusLabel(this.season().status);
  }

  startConfirm(): void {
    this.confirmingActivate.set(true);
  }

  cancelConfirm(): void {
    this.confirmingActivate.set(false);
  }

  confirmActivate(): void {
    this.confirmingActivate.set(false);
    this.activate.emit(this.season().id);
  }
}
