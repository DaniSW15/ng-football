import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CompetitionRepository } from '../domain/competition-repository';
import {
  Competition,
  CreateCompetitionPayload,
  RenameCompetitionPayload,
} from '../domain/competition-model';
import { CompetitionResponseDto } from './dtos/competition-api-dto';
import { CompetitionApiMapper } from './competition-api-mapper';

/**
 * Adaptador HTTP para /api/v1/competitions.
 * Implementa el puerto CompetitionRepository.
 */
@Service({ autoProvided: false })
export class CompetitionHttpAdapter extends CompetitionRepository {
  private readonly http = inject(HttpClient);

  override getAll(): Observable<Competition[]> {
    return this.http
      .get<CompetitionResponseDto[]>('/competitions')
      .pipe(map((dtos) => dtos.map(CompetitionApiMapper.toDomain)));
  }

  override getById(id: string): Observable<Competition> {
    return this.http
      .get<CompetitionResponseDto>(`/competitions/${id}`)
      .pipe(map(CompetitionApiMapper.toDomain));
  }

  override create(payload: CreateCompetitionPayload): Observable<Competition> {
    const dto = CompetitionApiMapper.toCreateDto(payload);
    return this.http
      .post<CompetitionResponseDto>('/competitions', dto)
      .pipe(map(CompetitionApiMapper.toDomain));
  }

  override rename(
    id: string,
    payload: RenameCompetitionPayload
  ): Observable<Competition> {
    const dto = CompetitionApiMapper.toRenameDto(payload);
    return this.http
      .patch<CompetitionResponseDto>(`/competitions/${id}`, dto)
      .pipe(map(CompetitionApiMapper.toDomain));
  }

  override delete(id: string): Observable<void> {
    return this.http.delete<void>(`/competitions/${id}`);
  }
}
