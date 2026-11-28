import {
  CreateTeamPayload,
  RenameTeamPayload,
  Team,
} from '@teams/domain/team.model';
import {
  CreateTeamRequestDto,
  RenameTeamRequestDto,
  TeamResponseDto,
} from './dtos/team-api.dto';

/**
 * Mapper: traduce entre el contrato del API (DTO snake_case)
 * y el modelo de dominio (camelCase).
 */
export class TeamApiMapper {
  static toDomain(dto: TeamResponseDto): Team {
    return {
      id: dto.id,
      name: dto.name,
      createdAt: dto.created_at,
    };
  }

  static toCreateDto(payload: CreateTeamPayload): CreateTeamRequestDto {
    return {
      name: payload.name.trim(),
    };
  }

  static toRenameDto(payload: RenameTeamPayload): RenameTeamRequestDto {
    return {
      name: payload.name.trim(),
    };
  }
}
