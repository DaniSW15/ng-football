/** Entidad de dominio — sin dependencias de Angular ni HTTP */
export interface Team {
  readonly id: string;
  readonly name: string;
  readonly country: string;
  readonly foundedYear: number;
}

/** Value Object para creación */
export interface CreateTeamPayload {
  readonly name: string;
  readonly country: string;
  readonly foundedYear: number;
}
