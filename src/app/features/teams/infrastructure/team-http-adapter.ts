import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { TeamRepository } from '../domain/team-repository';
import { Team, CreateTeamPayload } from '../domain/team.model';
import { TeamApiDto } from './dtos/team-api.dto';
import { TeamApiMapper } from './team-api-mapper';

const BASE_URL = 'http://127.0.0.1:8000/api/v1/teams';

/**
 * Adaptador HTTP — implementa el puerto del dominio.
 * Es el ÚNICO lugar que conoce URLs, HttpClient y DTOs.
 */
@Service({ autoProvided: false })
export class TeamHttpAdapter extends TeamRepository {
  private readonly http = inject(HttpClient);

  override getAll(): Observable<Team[]> {
    return this.http
      .get<TeamApiDto[]>(`${BASE_URL}/`)
      .pipe(map((dtos) => dtos.map(TeamApiMapper.toDomain)));
  }

  override getById(id: string): Observable<Team> {
    return this.http
      .get<TeamApiDto>(`${BASE_URL}/${id}`)
      .pipe(map(TeamApiMapper.toDomain));
  }

  override create(payload: CreateTeamPayload): Observable<Team> {
    const dto = TeamApiMapper.toCreateDto(payload);
    return this.http
      .post<TeamApiDto>(`${BASE_URL}/`, dto)
      .pipe(map(TeamApiMapper.toDomain));
  }

  override delete(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${id}`);
  }
}
