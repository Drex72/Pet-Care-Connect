import { UserType } from "../interfaces/UserTypeInterface";
import { models } from "../models";

/**
 *
 * @param userType Gets the Type of user
 * @returns A model Ctor
 */
export const getModelToBeUsed = (userType: UserType) => {
  const { PetProvider, PetOwner } = models;
  switch (userType) {
    case "PET-OWNER":
      return PetOwner;
    case "PET-PROVIDER":
      return PetProvider;
  }
};
