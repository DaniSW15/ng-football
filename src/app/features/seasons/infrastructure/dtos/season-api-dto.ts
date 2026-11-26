export type SeasonStatusDto = 'draft' | 'active' | 'completed' | 'archived';

/**
 * Contrato exacto del backend FastAPI (/api/v1/seasons y /competitions/{id}/seasons)
 */
export interface SeasonResponseDto {
  id: string;
  competition_id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: SeasonStatusDto;
  created_at: string;
}

export interface CreateSeasonRequestDto {
  name: string;
  start_date: string;
  end_date: string;
}

export interface EnrollmentResponseDto {
  id: string;
  season_id: string;
  team_id: string;
  group_name: string | null;
  created_at: string;
}

export interface EnrollTeamRequestDto {
  team_id: string;
  group_name: string | null;
}
