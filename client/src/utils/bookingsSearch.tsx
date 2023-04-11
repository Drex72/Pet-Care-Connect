import {
  BookingStatus,
  IFormattedBooking,
} from "../interfaces/BookingInterface";

export const filterBookingBySearch = (
  bookings: IFormattedBooking[],
  searchKeyword: string
) => {
  if (searchKeyword) {
    const result = bookings.filter((booking) =>
      booking.serviceName.toLowerCase().includes(searchKeyword)
    );
    return { message: "Successfully Searched", data: result };
  } else {
    return { message: "No Value Searched", data: bookings };
  }
};
export const filterBookingByStatus = (
  bookings: IFormattedBooking[],
  status: BookingStatus
) => {
  if (status) {
    const result = bookings.filter(
      (booking) =>
        booking?.status?.toLocaleLowerCase() === status?.toLocaleLowerCase()
    );
    return { message: "Successfully Searched", data: result };
  } else {
    return { message: "No Value Filtered", data: bookings };
  }
};
