import {
  CreateSeasonPayload,
  Enrollment,
  EnrollTeamPayload,
  Season,
} from '../domain/season-model';
import {
  CreateSeasonRequestDto,
  EnrollmentResponseDto,
  EnrollTeamRequestDto,
  SeasonResponseDto,
} from './dtos/season-api-dto';

/**
 * Mapper: traduce entre el contrato del API (DTO snake_case)
 * y el modelo de dominio puro (camelCase).
 */
export class SeasonApiMapper {
  static toDomain(dto: SeasonResponseDto): Season {
    return {
      id: dto.id,
      competitionId: dto.competition_id,
      name: dto.name,
      startDate: dto.start_date,
      endDate: dto.end_date,
      status: dto.status,
      createdAt: dto.created_at,
    };
  }

  static toCreateDto(payload: CreateSeasonPayload): CreateSeasonRequestDto {
    return {
      name: payload.name.trim(),
      start_date: payload.startDate,
      end_date: payload.endDate,
    };
  }

  static enrollmentToDomain(dto: EnrollmentResponseDto): Enrollment {
    return {
      id: dto.id,
      seasonId: dto.season_id,
      teamId: dto.team_id,
      groupName: dto.group_name,
      createdAt: dto.created_at,
    };
  }

  static toEnrollDto(payload: EnrollTeamPayload): EnrollTeamRequestDto {
    const cleanGroup = payload.groupName?.trim() ?? '';
    return {
      team_id: payload.teamId,
      group_name: cleanGroup.length > 0 ? cleanGroup : null,
    };
  }
}
