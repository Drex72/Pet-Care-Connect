import { UserType } from "./User";

export interface ISendVerification {
  email: string;
  user_type: UserType;
}

export interface IConfirmOTP extends ISendVerification {
  otp: string;
}
