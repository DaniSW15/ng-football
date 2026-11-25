/**
 * Contrato exacto del backend FastAPI (/api/v1/competitions)
 */
export interface CompetitionResponseDto {
  id: string;
  name: string;
  competition_type: 'league' | 'cup' | 'super_cup' | 'tournament';
  scope: 'domestic' | 'international';
  country_code: string | null;
  created_at: string;
}

export interface CreateCompetitionRequestDto {
  name: string;
  competition_type: 'league' | 'cup' | 'super_cup' | 'tournament';
  scope: 'domestic' | 'international';
  country_code: string | null;
}

export interface RenameCompetitionRequestDto {
  name: string;
}

// Aliases para compatibilidad
export type CompetitionApiDto = CompetitionResponseDto;
export type CreateCompetitionApiDto = CreateCompetitionRequestDto;
