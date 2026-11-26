import { Observable } from 'rxjs';
import {
  CreateTeamPayload,
  RenameTeamPayload,
  Team,
} from './team.model';

/**
 * Puerto (interfaz abstracta) — define el contrato de datos para equipos.
 */
export abstract class TeamRepository {
  abstract getAll(): Observable<Team[]>;
  abstract getById(id: string): Observable<Team>;
  abstract create(payload: CreateTeamPayload): Observable<Team>;
  abstract rename(id: string, payload: RenameTeamPayload): Observable<Team>;
  abstract delete(id: string): Observable<void>;
}
