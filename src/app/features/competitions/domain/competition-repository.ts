import { Observable } from 'rxjs';
import {
  Competition,
  CreateCompetitionPayload,
  RenameCompetitionPayload,
} from './competition-model';

/**
 * Puerto (interfaz abstracta) — define el contrato de datos para competiciones
 */
export abstract class CompetitionRepository {
  abstract getAll(): Observable<Competition[]>;
  abstract getById(id: string): Observable<Competition>;
  abstract create(payload: CreateCompetitionPayload): Observable<Competition>;
  abstract rename(
    id: string,
    payload: RenameCompetitionPayload
  ): Observable<Competition>;
  abstract delete(id: string): Observable<void>;
}
