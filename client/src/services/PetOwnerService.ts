import { UserResponseInformation } from "../interfaces/BasicUserInterface";
import {
  BookingRequestInterface,
  BookingStatus,
} from "../interfaces/BookingInterface";
import { PetInformationInterface } from "../interfaces/PetInformationInterface";
import { ReviewRequestInterface } from "../interfaces/ReviewInterface";
import axiosInstance from "./axios";

class PetOwnerService {
  getUserDetails = async (id: string) => {
    return await axiosInstance.get(`/pet-owner?id=${id}`);
  };

  updateUserDetails = async (data: UserResponseInformation) => {
    return await axiosInstance.put(`/pet-owner`, data);
  };

  updateUserAvatar = async (data: FormData) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    return await axiosInstance.post(`/pet-owner/upload-avatar`, data, config);
  };

  getAllBookings = async (id: string) => {
    return await axiosInstance.get(`/pet-owner/bookings?id=${id}`);
  };
  getAllReviewsForAProvider = async (id: string) => {
    return await axiosInstance.get(
      `/pet-owner/review-pet-provider?pet_provider_id=${id}`
    );
  };
  reviewPetProvider = async (data: ReviewRequestInterface) => {
    return await axiosInstance.post(`/pet-owner/review-pet-provider`, data);
  };
  createNewPet = async (data: PetInformationInterface) => {
    return await axiosInstance.post(`/pet-owner/create-pet`, data);
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
