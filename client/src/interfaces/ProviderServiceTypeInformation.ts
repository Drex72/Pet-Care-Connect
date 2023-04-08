import { UserBaseInformation } from "./BasicUserInterface";

export interface PetProviderServiceInterface {
  service_name: string;
  service_description: string;
  service_price_per_hour: string;
}

export type ICreatePetCareProvider = UserBaseInformation &
  PetProviderServiceInterface;
