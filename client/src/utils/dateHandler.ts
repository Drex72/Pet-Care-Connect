import { isPast, isToday, isWeekend } from "date-fns";
import { IFormattedBooking } from "../interfaces/BookingInterface";

// Checks if a date is in the past
export function isDateInPast(selectedDate: number | Date) {
  return isPast(selectedDate) && !isToday(selectedDate);
}

export function dateIsNotAvailable(
  selectedDate: Date,
  bookings: IFormattedBooking[]
) {
  const dateToCheckUTC = new Date(
    Date.UTC(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      0, // Set the hour to 0 in UTC time zone
      0, // Set the minute to 0 in UTC time zone
      0, // Set the second to 0 in UTC time zone
      0 // Set the millisecond to 0 in UTC time zone
    )
  );

  const dateToCheckString: string = dateToCheckUTC.toISOString();

  for (const booking of bookings) {
    const { date } = booking;
    if (date.slice(0, 10) === dateToCheckString.slice(0, 10)) {
      return true;
    }
  }

  return isDateInPast(selectedDate);
}
// Checks if it is weekened
export function isWeekendDay(selectedDate: number | Date) {
  return isWeekend(selectedDate);
}
// Formats the weekdays
export const formatShortWeekday = (locale: any, value: any) => {
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  return weekdays[value.getDay()];
};

export function formatDate(date: Date): string {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
