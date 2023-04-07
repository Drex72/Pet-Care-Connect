import { UserType } from "./User";

export interface LoginInput {
  email: string;
  password: string;
  user_type: UserType | null;
}

export interface LoginResponse {
  status: boolean;
  code: number;
  message: string;
  data: { accessToken: string; refreshToken: string };
}
