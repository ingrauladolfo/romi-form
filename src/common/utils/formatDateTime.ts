// utils/formatDateTime.ts
const pad = (n: number) => String(n).padStart(2, '0');

const isDateOnlyISO = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s.trim());

const formatDateTime = (date: string | Date, lang: 'es' | 'en' = 'es'): string => {
  try {
    // Date-only ISO (yyyy-mm-dd) should be treated as local date (no timezone shift)
    if (typeof date === 'string' && isDateOnlyISO(date)) {
      const [yStr, mStr, dStr] = date.split('-');
      const y = Number(yStr);
      const m = Number(mStr);
      const d = Number(dStr);
      // create as local date
      const local = new Date(y, m - 1, d);
      if (lang === 'es') {
        // example: 18/8/2025 (no leading zero month/day)
        return `${local.getDate()}/${local.getMonth() + 1}/${local.getFullYear()}`;
      } else {
        // example: 2025/08/18 (zero-padded month/day)
        return `${local.getFullYear()}/${pad(local.getMonth() + 1)}/${pad(local.getDate())}`;
      }
    }

    // otherwise treat as Date-time (string or Date)
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return lang === 'es' ? 'Fecha inválida' : 'Invalid date';

    const day = parsed.getDate();
    const month = parsed.getMonth() + 1;
    const year = parsed.getFullYear();

    // 12-hour time with seconds and "a.m./p.m." lowercase with dots
    const hours = parsed.getHours();
    const minutes = parsed.getMinutes();
    const seconds = parsed.getSeconds();
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    const meridiem = hours < 12 ? 'a.m.' : 'p.m.';

    const datePart = lang === 'es'
      ? `${day}/${month}/${year}`              // 18/8/2025
      : `${year}/${pad(month)}/${pad(day)}`;  // 2025/08/18

    const timePart = `${hour12}:${pad(minutes)}:${pad(seconds)} ${meridiem}`;

    return `${datePart}, ${timePart}`;
  } catch {
    return lang === 'es' ? 'Fecha inválida' : 'Invalid date';
  }
};

export { formatDateTime };
export default formatDateTime;
