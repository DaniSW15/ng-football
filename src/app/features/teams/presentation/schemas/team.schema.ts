import {
  schema,
  required,
  minLength,
  min,
  max,
} from '@angular/forms/signals';
import { CreateTeamPayload } from '../../domain/team.model';

/**
 * Esquema reusable y componible de validación para Team.
 *
 * Sigue la arquitectura de dos capas de Signal Forms:
 * - Capa Estructural: se ejecuta una sola vez al instanciar el formulario.
 * - Capa de Comportamiento: reglas reactivas reevaluadas en runtime mediante signals.
 */
export const teamSchema = schema<CreateTeamPayload>((team) => {
  required(team.name, { message: 'El nombre es requerido' });
  minLength(team.name, 2, { message: 'Mínimo 2 caracteres' });

  required(team.country, { message: 'El país es requerido' });
  minLength(team.country, 2, { message: 'Mínimo 2 caracteres' });

  required(team.foundedYear, { message: 'El año de fundación es requerido' });
  min(team.foundedYear, 1850, { message: 'El año debe ser posterior a 1850' });
  max(team.foundedYear, 2030, { message: 'El año no puede exceder 2030' });
});
