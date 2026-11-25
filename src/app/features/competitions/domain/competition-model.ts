export type CompetitionType = 'league' | 'cup' | 'super_cup' | 'tournament';
export type CompetitionScope = 'domestic' | 'international';

/** Entidad de dominio pura */
export interface Competition {
  readonly id: string;
  readonly name: string;
  readonly competitionType: CompetitionType;
  readonly scope: CompetitionScope;
  readonly countryCode: string | null;
  readonly createdAt: string;
}

/** Value Object / Payload para creación */
export interface CreateCompetitionPayload {
  readonly name: string;
  readonly competitionType: CompetitionType;
  readonly scope: CompetitionScope;
  readonly countryCode: string | null;
}

/** Modelo para formularios de Signal Forms (UI strings) */
export interface CreateCompetitionFormModel {
  readonly name: string;
  readonly competitionType: CompetitionType;
  readonly scope: CompetitionScope;
  readonly countryCode: string;
}

/** Value Object / Payload para renombrar (PATCH) */
export interface RenameCompetitionPayload {
  readonly name: string;
}

// Aliases para compatibilidad
export type CompetitionModel = Competition;
export type CreateCompetitionModel = CreateCompetitionPayload;
