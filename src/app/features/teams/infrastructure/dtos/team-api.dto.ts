/** Contrato exacto del backend — snake_case como viene del API */
export interface TeamApiDto {
  id: string;
  name: string;
  country: string;
  founded_year: number;
}

export interface CreateTeamApiDto {
  name: string;
  country: string;
  founded_year: number;
}
