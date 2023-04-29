import { UserBaseInformation } from "./BasicUserInterface";
import { UserType } from "./User";

export interface PetProviderServiceInterface {
  service_name: string;
  service_description: string;
  service_price_per_hour: string;
  business_name: string;
}

export type ICreatePetCareProvider = UserBaseInformation &
  PetProviderServiceInterface;

export interface PetProviderApiResponseInterface {
  status: boolean;
  code: number;
  message: string;
  data: ProviderServiceType[];
}

export interface ProviderServiceType extends PetProviderServiceInterface {
  id: string;
  service_type_id?: string;
  service_rating: number;
}

export interface IFormattedPetProvider extends UserBaseInformation {
  id: string;
  user_type: UserType;
  user_verified: boolean;
  provider_service_types: ProviderServiceType[];
  user_avatar: string;
  reviews: any[];
  overall_provider_rating: number;
  business_name: string;
}

export interface IFormattedPetOwner extends UserBaseInformation {
  id: string;
  user_type: UserType;
  user_verified: boolean;
  provider_service_types: ProviderServiceType[];
  user_avatar: string;
}
