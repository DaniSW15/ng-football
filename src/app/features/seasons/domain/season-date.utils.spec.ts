import { formatCalendarDate, isValidCalendarDate } from './season-date.utils';

describe('season-date.utils', () => {
  it('validates real calendar dates including leap years', () => {
    expect(isValidCalendarDate('2025-08-15')).toBe(true);
    expect(isValidCalendarDate('2024-02-29')).toBe(true);
    expect(isValidCalendarDate('2025-02-29')).toBe(false);
    expect(isValidCalendarDate('2025-13-01')).toBe(false);
    expect(isValidCalendarDate('15-08-2025')).toBe(false);
  });

  it('formats calendar dates without UTC timezone drift', () => {
    expect(formatCalendarDate('2025-08-15')).toBe('15 ago 2025');
    expect(formatCalendarDate('2026-01-01')).toBe('01 ene 2026');
  });
});
