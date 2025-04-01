import { addDays, format, isWeekend } from "date-fns";

export function addDaysToDate(startDate: string, count: number): string {
  const calculateDate = (date: Date, remainingDays: number): Date => {
    if (remainingDays === 0) return date;
    const nextDate = addDays(date, 1);
    return isWeekend(nextDate)
      ? calculateDate(nextDate, remainingDays)
      : calculateDate(nextDate, remainingDays - 1);
  };

  const finalDate = calculateDate(new Date(startDate), count);
  return format(finalDate, "EEEE MMMM d");
}
