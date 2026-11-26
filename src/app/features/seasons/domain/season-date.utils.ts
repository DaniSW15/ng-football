export const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const SHORT_MONTHS_ES = [
  'ene',
  'feb',
  'mar',
  'abr',
  'may',
  'jun',
  'jul',
  'ago',
  'sep',
  'oct',
  'nov',
  'dic',
] as const;

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysInMonth(year: number, month: number): number {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    return 30;
  }
  return 31;
}

/**
 * Valida una fecha calendario ISO (YYYY-MM-DD) sin conversión a zona horaria.
 */
export function isValidCalendarDate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) {
    return false;
  }

  const [yearStr, monthStr, dayStr] = value.split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  if (month < 1 || month > 12 || day < 1) {
    return false;
  }

  return day <= daysInMonth(year, month);
}

/**
 * Formatea una fecha calendario (YYYY-MM-DD) de forma determinista y sin
 * desfase horario (evita `new Date('YYYY-MM-DD')` en UTC).
 */
export function formatCalendarDate(value: string): string {
  if (!isValidCalendarDate(value)) {
    return value;
  }

  const [yearStr, monthStr, dayStr] = value.split('-');
  const monthIndex = Number(monthStr) - 1;
  const monthLabel = SHORT_MONTHS_ES[monthIndex] ?? monthStr;

  return `${dayStr} ${monthLabel} ${yearStr}`;
}
