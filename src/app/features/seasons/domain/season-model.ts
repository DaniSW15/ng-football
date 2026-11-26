export type SeasonStatus = 'draft' | 'active' | 'completed' | 'archived';

export const SEASON_STATUSES: readonly SeasonStatus[] = [
  'draft',
  'active',
  'completed',
  'archived',
] as const;

/** Entidad de dominio para Temporada */
export interface Season {
  readonly id: string;
  readonly competitionId: string;
  readonly name: string;
  /** Fecha calendario ISO (YYYY-MM-DD) sin zona horaria */
  readonly startDate: string;
  /** Fecha calendario ISO (YYYY-MM-DD) sin zona horaria */
  readonly endDate: string;
  readonly status: SeasonStatus;
  readonly createdAt: string;
}

/** Payload para creación (POST /competitions/{competition_id}/seasons) */
export interface CreateSeasonPayload {
  readonly name: string;
  readonly startDate: string;
  readonly endDate: string;
}

/** Modelo para formulario Signal Forms de creación de temporada */
export interface CreateSeasonFormModel {
  readonly name: string;
  readonly startDate: string;
  readonly endDate: string;
}

/** Entidad de dominio para Inscripción de equipo en una temporada */
export interface Enrollment {
  readonly id: string;
  readonly seasonId: string;
  readonly teamId: string;
  readonly groupName: string | null;
  readonly createdAt: string;
}

/** Payload para inscribir un equipo (POST /seasons/{season_id}/enrollments) */
export interface EnrollTeamPayload {
  readonly teamId: string;
  readonly groupName: string | null;
}

/** Modelo para formulario Signal Forms de inscripción */
export interface EnrollTeamFormModel {
  readonly teamId: string;
  readonly groupName: string;
}

// Aliases para compatibilidad
export type SeasonModel = Season;
export type CreateSeasonModel = CreateSeasonPayload;
