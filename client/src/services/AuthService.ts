import axios from "axios";
import { UserBaseInformation } from "../interfaces/BasicUserInterface";
import { LoginInput } from "../interfaces/LoginInput";
import { PetInformationInterface } from "../interfaces/PetInformationInterface";
import { PetProviderServiceInterface } from "../interfaces/ProviderServiceTypeInformation";
import axiosInstance from "./axios";

class AuthService {
  // login = async (data: LoginInput) => {
  //   return await axiosInstance.post(`/auth/login`, data, {
  //     withCredentials: true,
  //   });
  // };
  login = (data: LoginInput) => {
    return axios.post(`http://localhost:8000/auth/login`, data, {
      withCredentials: true,
    });
  };
  createPetCareProvider = (
    data: UserBaseInformation & PetProviderServiceInterface
  ) => {
    return axios.post(
      `http://localhost:8000/auth/register/pet-provider`,
      data,
      {
        withCredentials: true,
      }
    );
  };
}

const authService = new AuthService();
export default authService;
