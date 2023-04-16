import { ICreatePetOwner } from "./PetInformationInterface";
import {
  ICreatePetCareProvider,
  IFormattedPetOwner,
  IFormattedPetProvider,
  ProviderServiceType,
} from "./ProviderServiceTypeInformation";

export interface ReviewInterface {
  comment: string;
  createdAt: string;
  pet_owner: IFormattedPetOwner;
  pet_provider: IFormattedPetProvider;
  provider_service_type: ProviderServiceType;
  rating: number;
}

export type ReviewRequestInterface = {
  comment: string;
  pet_owner_id: string;
  pet_provider_id: string;
  service_type_id: string;
  rating: number;
};
