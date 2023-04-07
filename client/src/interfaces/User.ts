

export interface Profile_Interface {
  phone_number: string;
  id: string;
  email: string;
  parent_email: string;
  email_verified: string;
  given_name: string;
  family_name: string;
  address: string;
  parent_phone_number: string;
  phone_number_verified: string;
  birthdate: string;
  profile_picture: string;
  activeMfa: string[];
}

export type UserType = "PET-OWNER" | "PET-PROVIDER";
