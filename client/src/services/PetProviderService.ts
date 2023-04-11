import { BookingStatus } from "../interfaces/BookingInterface";
import axiosInstance from "./axios";

class PetProviderService {
  getUserDetails = async (id: string) => {
    return await axiosInstance.get(`/pet-provider?id=${id}`);
  };
  getAllPetProviders = async () => {
    return await axiosInstance.get(`/pet-provider`);
  };
  getAllPetProviderServices = async () => {
    return await axiosInstance.get(`/pet-provider/service`);
  };
  getAllBookings = async (id: string) => {
    return await axiosInstance.get(`/pet-provider/bookings?id=${id}`);
  };
  updateBooking = async (id: string, status: BookingStatus) => {
    return await axiosInstance.put(`/pet-provider/bookings`, {
      id,
      status,
    });
  };
  deleteAccount = async (id: string) => {
    return await axiosInstance.delete(`/pet-provider?id=${id}`);
  };
}

const petProviderService = new PetProviderService();
export default petProviderService;
