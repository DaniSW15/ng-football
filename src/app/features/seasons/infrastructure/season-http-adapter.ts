import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SeasonRepository } from '../domain/season-repository';
import {
  CreateSeasonPayload,
  Enrollment,
  EnrollTeamPayload,
  Season,
} from '../domain/season-model';
import {
  EnrollmentResponseDto,
  SeasonResponseDto,
} from './dtos/season-api-dto';
import { SeasonApiMapper } from './season-api-mapper';

/**
 * Adaptador HTTP para /api/v1/seasons y /api/v1/competitions/{competition_id}/seasons.
 * Implementa el puerto SeasonRepository.
 */
@Service({ autoProvided: false })
export class SeasonHttpAdapter extends SeasonRepository {
  private readonly http = inject(HttpClient);

  override getByCompetition(competitionId: string): Observable<Season[]> {
    return this.http
      .get<SeasonResponseDto[]>(`/competitions/${competitionId}/seasons`)
      .pipe(map((dtos) => dtos.map(SeasonApiMapper.toDomain)));
  }

  override getById(seasonId: string): Observable<Season> {
    return this.http
      .get<SeasonResponseDto>(`/seasons/${seasonId}`)
      .pipe(map(SeasonApiMapper.toDomain));
  }

  override create(
    competitionId: string,
    payload: CreateSeasonPayload
  ): Observable<Season> {
    const dto = SeasonApiMapper.toCreateDto(payload);
    return this.http
      .post<SeasonResponseDto>(`/competitions/${competitionId}/seasons`, dto)
      .pipe(map(SeasonApiMapper.toDomain));
  }

  override activate(seasonId: string): Observable<Season> {
    return this.http
      .post<SeasonResponseDto>(`/seasons/${seasonId}/activate`, null)
      .pipe(map(SeasonApiMapper.toDomain));
  }

  override getEnrollments(seasonId: string): Observable<Enrollment[]> {
    return this.http
      .get<EnrollmentResponseDto[]>(`/seasons/${seasonId}/enrollments`)
      .pipe(map((dtos) => dtos.map(SeasonApiMapper.enrollmentToDomain)));
  }

  override enrollTeam(
    seasonId: string,
    payload: EnrollTeamPayload
  ): Observable<Enrollment> {
    const dto = SeasonApiMapper.toEnrollDto(payload);
    return this.http
      .post<EnrollmentResponseDto>(`/seasons/${seasonId}/enrollments`, dto)
      .pipe(map(SeasonApiMapper.enrollmentToDomain));
  }
}
