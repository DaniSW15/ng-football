import {
  Competition,
  CreateCompetitionPayload,
  RenameCompetitionPayload,
} from '../domain/competition-model';
import {
  CompetitionResponseDto,
  CreateCompetitionRequestDto,
  RenameCompetitionRequestDto,
} from './dtos/competition-api-dto';

/**
 * Mapper: traduce entre el contrato del API (DTO snake_case)
 * y el modelo de dominio puro (camelCase).
 */
export class CompetitionApiMapper {
  static toDomain(dto: CompetitionResponseDto): Competition {
    return {
      id: dto.id,
      name: dto.name,
      competitionType: dto.competition_type,
      scope: dto.scope,
      countryCode: dto.country_code,
      createdAt: dto.created_at,
    };
  }

  static toCreateDto(
    payload: CreateCompetitionPayload
  ): CreateCompetitionRequestDto {
    return {
      name: payload.name,
      competition_type: payload.competitionType,
      scope: payload.scope,
      country_code: payload.countryCode,
    };
  }

  static toRenameDto(
    payload: RenameCompetitionPayload
  ): RenameCompetitionRequestDto {
    return {
      name: payload.name,
    };
  }
}
