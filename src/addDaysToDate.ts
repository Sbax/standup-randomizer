export function addDaysToDate(startDate: string, count: number): string {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(startDate);

  for (let addedDays = 0; addedDays < count; ) {
    date.setDate(date.getDate() + 1);
    const dayOfWeek = date.getDay();

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      addedDays++;
    }
  }

  const dayName = daysOfWeek[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();

  return `${dayName} ${monthName} ${day}`;
}
