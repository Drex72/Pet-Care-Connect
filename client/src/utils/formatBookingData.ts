import { IFormattedBooking } from "../interfaces/BookingInterface";

export const formatBookingDataForPetOwner = (data: any): IFormattedBooking => {
  return {
    id: data?.id,
    status: data?.status,
    date: data.date?.slice(0, 10),
    name: data?.pet_provider?.first_name,
    email: data?.pet_provider?.email,
    serviceName: data?.provider_service_type.service_name,
    serviceCharge: data?.price,
  };
};

export const formatBookingDataForPetProvider = (
  data: any
): IFormattedBooking => {
  console.log(data);
  return {
    id: data?.id,
    status: data?.status,
    date: data.date?.slice(0, 10),
    name: data?.pet_owner?.first_name,
    email: data?.pet_owner?.email,
    serviceName: data?.provider_service_type?.service_name,
    serviceCharge: data?.price,
  };
};
