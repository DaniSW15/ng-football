import { SeasonStatus } from './season-model';

const SEASON_STATUS_LABELS: Record<SeasonStatus, string> = {
  draft: 'Borrador',
  active: 'Activa',
  completed: 'Completada',
  archived: 'Archivada',
};

export function getSeasonStatusLabel(status: SeasonStatus): string {
  return SEASON_STATUS_LABELS[status] ?? status;
}
