export interface BookingRequestInterface {
  pet_owner_id: string;
  pet_provider_id: string;
  service_type_id: string;
  date: string;
  time: String;
  status: BookingStatus;
}

export type BookingStatus = {
  status: "REJECTED" | "CONFIRMED" | "PENDING";
};
