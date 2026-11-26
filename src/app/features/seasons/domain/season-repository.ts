import { Observable } from 'rxjs';
import {
  CreateSeasonPayload,
  Enrollment,
  EnrollTeamPayload,
  Season,
} from './season-model';

/**
 * Puerto (interfaz abstracta) — define el contrato de datos para temporadas e inscripciones.
 */
export abstract class SeasonRepository {
  abstract getByCompetition(competitionId: string): Observable<Season[]>;
  abstract getById(seasonId: string): Observable<Season>;
  abstract create(
    competitionId: string,
    payload: CreateSeasonPayload
  ): Observable<Season>;
  abstract activate(seasonId: string): Observable<Season>;
  abstract getEnrollments(seasonId: string): Observable<Enrollment[]>;
  abstract enrollTeam(
    seasonId: string,
    payload: EnrollTeamPayload
  ): Observable<Enrollment>;
}
