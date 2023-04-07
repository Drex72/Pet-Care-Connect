import axios from "axios";
import { LoginInput } from "../interfaces/LoginInput";
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
}

const authService = new AuthService();
export default authService;
