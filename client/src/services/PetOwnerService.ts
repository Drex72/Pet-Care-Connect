import {
  BookingRequestInterface,
  BookingStatus,
} from "../interfaces/BookingInterface";
import axiosInstance from "./axios";

class PetOwnerService {
  getUserDetails = async (id: string) => {
    return await axiosInstance.get(`/pet-owner?id=${id}`);
  };

  getAllBookings = async (id: string) => {
    return await axiosInstance.get(`/pet-owner/bookings?id=${id}`);
  };
  createNewBooking = async (data: BookingRequestInterface) => {
    return await axiosInstance.post(`/pet-owner/bookings`, data);
  };
  updateBooking = async (id: string, status: BookingStatus) => {
    return await axiosInstance.put(`/pet-owner/bookings`, {
      id,
      status,
    });
  };

  deleteAccount = async (id: string) => {
    return await axiosInstance.delete(`/pet-owner?id=${id}`);
  };
}

const petOwnerService = new PetOwnerService();
export default petOwnerService;
