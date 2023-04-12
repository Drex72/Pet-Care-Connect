export type BookingStatus =
  | "REJECTED"
  | "CONFIRMED"
  | "PENDING"
  | "PAYMENTPENDING";

export interface BookingRequestInterface {
  pet_owner_id: string;
  pet_provider_id: string;
  service_type_id: string;
  date: string;
  time: String;
  status?: BookingStatus;
  duration: string | number;
  price?: number;
}

export interface IFormattedBooking {
  id: string;
  status: BookingStatus;
  date: string;
  name: string;
  email: string;
  serviceName: string;
  serviceCharge: number;
}
