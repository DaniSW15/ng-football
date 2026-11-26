/** Contrato exacto del backend FastAPI (/api/v1/teams) */
export interface TeamResponseDto {
  id: string;
  name: string;
  created_at: string;
}

export interface CreateTeamRequestDto {
  name: string;
}

export interface RenameTeamRequestDto {
  name: string;
}

// Aliases para compatibilidad
export type TeamApiDto = TeamResponseDto;
export type CreateTeamApiDto = CreateTeamRequestDto;
