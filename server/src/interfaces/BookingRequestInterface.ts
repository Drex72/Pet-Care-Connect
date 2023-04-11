export interface BookingRequestInterface {
  pet_owner_id: string;
  pet_provider_id: string;
  service_type_id: string;
  date: string;
  time: String;
  status?: BookingStatus;
  duration: number;
  price?: number;
}

export type BookingStatus =
  | "REJECTED"
  | "CONFIRMED"
  | "PENDING"
  | "PAYMENTPENDING";
