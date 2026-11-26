import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { TeamRepository } from '../domain/team-repository';
import {
  CreateTeamPayload,
  RenameTeamPayload,
  Team,
} from '../domain/team.model';
import { TeamResponseDto } from './dtos/team-api.dto';
import { TeamApiMapper } from './team-api-mapper';

/**
 * Adaptador HTTP para /api/v1/teams.
 * Implementa el puerto TeamRepository.
 */
@Service({ autoProvided: false })
export class TeamHttpAdapter extends TeamRepository {
  private readonly http = inject(HttpClient);

  override getAll(): Observable<Team[]> {
    return this.http
      .get<TeamResponseDto[]>('/teams')
      .pipe(map((dtos) => dtos.map(TeamApiMapper.toDomain)));
  }

  override getById(id: string): Observable<Team> {
    return this.http
      .get<TeamResponseDto>(`/teams/${id}`)
      .pipe(map(TeamApiMapper.toDomain));
  }

  override create(payload: CreateTeamPayload): Observable<Team> {
    const dto = TeamApiMapper.toCreateDto(payload);
    return this.http
      .post<TeamResponseDto>('/teams', dto)
      .pipe(map(TeamApiMapper.toDomain));
  }

  override rename(id: string, payload: RenameTeamPayload): Observable<Team> {
    const dto = TeamApiMapper.toRenameDto(payload);
    return this.http
      .patch<TeamResponseDto>(`/teams/${id}`, dto)
      .pipe(map(TeamApiMapper.toDomain));
  }

  override delete(id: string): Observable<void> {
    return this.http.delete<void>(`/teams/${id}`);
  }
}
