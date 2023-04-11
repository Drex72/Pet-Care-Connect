import { UserType } from "../interfaces/User";
import petOwnerService from "../services/PetOwnerService";
import petProviderService from "../services/PetProviderService";

export const getServiceToBeUsed = (user_type: UserType) => {
  if (user_type === "PET-OWNER") {
    return petOwnerService;
  } else if (user_type === "PET-PROVIDER") {
    return petProviderService;
  }
  return null;
};

export const getSavedKey = (user_type: UserType) => {
  if (user_type === "PET-OWNER") {
    return "currentPetOwner";
  } else if (user_type === "PET-PROVIDER") {
    return "currentPetProvider";
  }
};
