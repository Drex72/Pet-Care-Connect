import { UserType } from "./UserTypeInterface";

export interface UserInterface {
  email: string;
  password: string;
  user_type: UserType;
}
