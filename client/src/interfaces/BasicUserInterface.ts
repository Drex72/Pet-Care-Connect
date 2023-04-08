export interface UserInterface {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AddressInterface {
  phone_number: string;
  street: string;
  city: string;
  postal_code: string;
  region: string;
}
export type UserBaseInformation = UserInterface & AddressInterface;
