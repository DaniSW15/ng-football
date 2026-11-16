import { Team, CreateTeamPayload } from '../domain/team.model';
import { TeamApiDto, CreateTeamApiDto } from './dtos/team-api.dto';

/**
 * Mapper: traduce entre el contrato del API (DTO) y el modelo de dominio.
 * Esto AÍSLA al dominio de cambios en el backend.
 */
export class TeamApiMapper {
  static toDomain(dto: TeamApiDto): Team {
    return {
      id: dto.id,
      name: dto.name,
      country: dto.country,
      foundedYear: dto.founded_year,
    };
  }

  static toCreateDto(payload: CreateTeamPayload): CreateTeamApiDto {
    return {
      name: payload.name,
      country: payload.country,
      founded_year: payload.foundedYear,
    };
  }
}
