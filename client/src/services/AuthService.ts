import { LoginInput, ResetPasswordInterface } from "../interfaces/LoginInput";
import { ICreatePetOwner } from "../interfaces/PetInformationInterface";
import { ICreatePetCareProvider } from "../interfaces/ProviderServiceTypeInformation";
import {
  IConfirmOTP,
  ISendVerification,
} from "../interfaces/VerifyEmailInterface";
import { IForgotPassword } from "../pages/verifyEmail/ForgotPassword";
import axiosInstance from "./axios";

class AuthService {
  login = async (data: LoginInput) => {
    return await axiosInstance.post(`/auth/login`, data);
  };

  createPetCareProvider = async (data: ICreatePetCareProvider) => {
    return await axiosInstance.post(`/auth/register/pet-provider`, data);
  };

  createPetOwner = async (data: ICreatePetOwner) => {
    return await axiosInstance.post(`/auth/register/pet-owner`, data);
  };
  sendVerificationMail = async (data: ISendVerification) => {
    return await axiosInstance.post(`/auth/verify-email`, data);
  };

  confirmVerificationCode = async (data: IConfirmOTP) => {
    return await axiosInstance.post(`/auth/verify-email/validate`, data);
  };
  forgotPasswordRequest = async (data: IForgotPassword) => {
    return await axiosInstance.post(`/auth/forgot-password`, data);
  };
  resetPassword = async (data: ResetPasswordInterface) => {
    return await axiosInstance.post(`/auth/forgot-password/validate`, data);
  };

  logout = async () => {
    return await axiosInstance.get(`/auth/logout`);
  };
}

const authService = new AuthService();
export default authService;
