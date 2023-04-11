import { UserBaseInformation } from "./BasicUserInterface";
import { UserType } from "./User";

export interface PetProviderServiceInterface {
  service_name: string;
  service_description: string;
  service_price_per_hour: string;
}

export type ICreatePetCareProvider = UserBaseInformation &
  PetProviderServiceInterface;

export interface PetProviderApiResponseInterface {
  status: boolean;
  code: number;
  message: string;
  data: ProviderServiceType[];
}

interface ProviderServiceType extends PetProviderServiceInterface {
  id: string;
}

export interface IFormattedPetProvider extends UserBaseInformation {
  user_type: UserType;
  user_verified: boolean;
  provider_service_types: ProviderServiceType;
}
