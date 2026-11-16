import { Observable } from 'rxjs';
import { Team, CreateTeamPayload } from './team.model';

/**
 * Puerto (interfaz abstracta) — define QUÉ necesita el dominio,
 * no CÓMO se obtiene. La infraestructura lo implementa.
 */
export abstract class TeamRepository {
  abstract getAll(): Observable<Team[]>;
  abstract getById(id: string): Observable<Team>;
  abstract create(payload: CreateTeamPayload): Observable<Team>;
  abstract delete(id: string): Observable<void>;
}
