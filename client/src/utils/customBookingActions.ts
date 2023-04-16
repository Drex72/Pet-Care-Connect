import { BookingStatus } from "../interfaces/BookingInterface";

export const statusClassName = (status: BookingStatus) => {
  switch (status) {
    case "CONFIRMED":
      return "confirmed_status_button status_button";
    case "PAYMENTPENDING":
      return "p-pending_status_button status_button";
    case "PENDING":
      return "pending_status_button status_button";
    case "REJECTED":
      return "rejected_status_button status_button";
    default:
      return "";
  }
};

export const bookingActionName = (status: BookingStatus) => {
  switch (status) {
    case "PAYMENTPENDING":
      return "Confirm";
    case "CONFIRMED":
      return "Pay for";
    case "PENDING":
      return "pending_status_button status_button";
    case "REJECTED":
      return "Reject";
    default:
      return "";
  }
};
