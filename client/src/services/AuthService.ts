import axios from "axios";
import { LoginInput } from "../interfaces/LoginInput";
import { ICreatePetOwner } from "../interfaces/PetInformationInterface";
import { ICreatePetCareProvider } from "../interfaces/ProviderServiceTypeInformation";
import { UserType } from "../interfaces/User";
import {
  IConfirmOTP,
  ISendVerification,
} from "../interfaces/VerifyEmailInterface";
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
  createPetCareProvider = (data: ICreatePetCareProvider) => {
    return axios.post(
      `http://localhost:8000/auth/register/pet-provider`,
      data,
      {
        withCredentials: true,
      }
    );
  };

  createPetOwner = (data: ICreatePetOwner) => {
    return axios.post(`http://localhost:8000/auth/register/pet-owner`, data, {
      withCredentials: true,
    });
  };
  sendVerificationMail = (data: ISendVerification) => {
    return axios.post(`http://localhost:8000/auth/verify-email`, data, {
      withCredentials: true,
    });
  };

  confirmVerificationCode = (data: IConfirmOTP) => {
    return axios.post(
      `http://localhost:8000/auth/verify-email/validate`,
      data,
      {
        withCredentials: true,
      }
    );
  };
}

const authService = new AuthService();
export default authService;
