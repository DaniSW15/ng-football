import {
  maxLength,
  minLength,
  pattern,
  required,
  schema,
  validate,
} from '@angular/forms/signals';
import {
  CreateSeasonFormModel,
  EnrollTeamFormModel,
} from '@seasons/domain/season-model';
import {
  ISO_DATE_PATTERN,
  isValidCalendarDate,
} from '@seasons/domain/season-date.utils';

/**
 * Esquema Signal Forms para crear una temporada (POST /competitions/{id}/seasons).
 */
export const createSeasonSchema = schema<CreateSeasonFormModel>((season) => {
  required(season.name, { message: 'El nombre de la temporada es obligatorio' });
  minLength(season.name, 1, { message: 'Mínimo 1 caracter' });
  maxLength(season.name, 50, { message: 'Máximo 50 caracteres' });
  validate(season.name, ({ value }) => {
    const raw = value();
    if (raw.length > 0 && raw.trim().length === 0) {
      return {
        kind: 'blank',
        message: 'El nombre no puede contener solo espacios',
      };
    }
    return undefined;
  });

  required(season.startDate, { message: 'La fecha de inicio es obligatoria' });
  pattern(season.startDate, ISO_DATE_PATTERN, {
    message: 'Usa el formato YYYY-MM-DD',
  });
  validate(season.startDate, ({ value }) => {
    const val = value();
    if (val && ISO_DATE_PATTERN.test(val) && !isValidCalendarDate(val)) {
      return { kind: 'invalidDate', message: 'La fecha de inicio no es válida' };
    }
    return undefined;
  });

  required(season.endDate, { message: 'La fecha de fin es obligatoria' });
  pattern(season.endDate, ISO_DATE_PATTERN, {
    message: 'Usa el formato YYYY-MM-DD',
  });
  validate(season.endDate, ({ value, valueOf }) => {
    const end = value();
    if (!end || !ISO_DATE_PATTERN.test(end)) {
      return undefined;
    }
    if (!isValidCalendarDate(end)) {
      return { kind: 'invalidDate', message: 'La fecha de fin no es válida' };
    }
    const start = valueOf(season.startDate);
    if (start && isValidCalendarDate(start) && end <= start) {
      return {
        kind: 'dateRange',
        message: 'La fecha de fin debe ser posterior a la fecha de inicio',
      };
    }
    return undefined;
  });
});

/**
 * Esquema Signal Forms para inscribir un equipo (POST /seasons/{id}/enrollments).
 */
export const enrollTeamSchema = schema<EnrollTeamFormModel>((enrollment) => {
  required(enrollment.teamId, { message: 'Selecciona un equipo para inscribir' });
  maxLength(enrollment.groupName, 20, {
    message: 'El grupo no puede exceder 20 caracteres',
  });
});
