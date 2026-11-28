import {
  disabled,
  maxLength,
  minLength,
  required,
  schema,
} from '@angular/forms/signals';
import { CreateCompetitionFormModel } from '@competitions/domain/competition-model';

/**
 * Esquema de validación para Competiciones con Signal Forms.
 * Aplica la arquitectura de 2 capas:
 * - Capa Estructural: árbol de reglas
 * - Capa de Comportamiento: deshabilitación y validación reactiva de countryCode
 *   según el scope ('domestic' vs 'international').
 */
export const competitionSchema = schema<CreateCompetitionFormModel>(
  (competition) => {
    required(competition.name, { message: 'El nombre es requerido' });
    minLength(competition.name, 1, { message: 'Mínimo 1 caracter' });
    maxLength(competition.name, 100, { message: 'Máximo 100 caracteres' });

    required(competition.competitionType, { message: 'El tipo es requerido' });
    required(competition.scope, { message: 'El alcance es requerido' });

    // Si es nacional, el código ISO de 2 letras es obligatorio
    required(competition.countryCode, {
      when: ({ valueOf }) => valueOf(competition.scope) === 'domestic',
      message: 'Código ISO de 2 caracteres requerido para ámbito nacional (ej. ES)',
    });
    maxLength(competition.countryCode, 2, {
      message: 'El código de país debe tener 2 caracteres',
    });

    // Deshabilita el campo countryCode si la competición es internacional
    disabled(competition.countryCode, {
      when: ({ valueOf }) => valueOf(competition.scope) === 'international',
    });
  }
);
