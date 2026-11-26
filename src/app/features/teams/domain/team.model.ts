/** Entidad de dominio — sin dependencias de Angular ni HTTP */
export interface Team {
  readonly id: string;
  readonly name: string;
  readonly createdAt: string;
}

/** Value Object para creación (POST /api/v1/teams) */
export interface CreateTeamPayload {
  readonly name: string;
}

/** Value Object para renombrar (PATCH /api/v1/teams/{team_id}) */
export interface RenameTeamPayload {
  readonly name: string;
}
