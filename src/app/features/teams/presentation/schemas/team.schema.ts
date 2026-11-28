import {
  maxLength,
  minLength,
  required,
  schema,
  SchemaPath,
  validate,
} from '@angular/forms/signals';
import { CreateTeamPayload, RenameTeamPayload } from '@teams/domain/team.model';

function applyTeamNameRules(namePath: SchemaPath<string>): void {
  required(namePath, { message: 'El nombre del equipo es obligatorio' });
  minLength(namePath, 1, { message: 'Mínimo 1 caracter' });
  maxLength(namePath, 100, { message: 'Máximo 100 caracteres' });
  validate(namePath, ({ value }) => {
    const raw = value();
    if (raw.length > 0 && raw.trim().length === 0) {
      return {
        kind: 'blank',
        message: 'El nombre no puede contener solo espacios',
      };
    }
    return undefined;
  });
}

/**
 * Esquema Signal Forms para creación de equipos (POST /api/v1/teams).
 */
export const teamSchema = schema<CreateTeamPayload>((team) => {
  applyTeamNameRules(team.name);
});

/**
 * Esquema Signal Forms para renombrar un equipo (PATCH /api/v1/teams/{team_id}).
 */
export const renameTeamSchema = schema<RenameTeamPayload>((team) => {
  applyTeamNameRules(team.name);
});
