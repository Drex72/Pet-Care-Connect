import { sequelize } from "../config/database";
import { BookingModel } from "./BookingModel";
import { OTPModel } from "./OTPModel";
import { PetModel } from "./PetModel";
import { PetOwnerModel } from "./PetOwnerModel";
import { PetProviderModel } from "./PetProviderModel";
import { ProviderServiceType } from "./ProviderServiceType";
import { ReviewModel } from "./ReviewModel";
import { UserAddressesModel } from "./UserAddressModel";
import { UserModel } from "./UserModel";

// Define your models
export const models = {
  PetOwner: PetOwnerModel(sequelize),
  PetProvider: PetProviderModel(sequelize),
  ProviderServiceType: ProviderServiceType(sequelize),
  User: UserModel(sequelize),
  Booking: BookingModel(sequelize),
  Pets: PetModel(sequelize),
  Review: ReviewModel(sequelize),
  UserAddresses: UserAddressesModel(sequelize),
  OTP: OTPModel(sequelize),
};
