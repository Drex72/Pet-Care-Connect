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
  Pets: PetModel(sequelize),
  UserAddresses: UserAddressesModel(sequelize),
  Booking: BookingModel(sequelize),
  Review: ReviewModel(sequelize),
  OTP: OTPModel(sequelize),
};

// models.PetProvider.belongsTo(models.User, { foreignKey: "user_id" });
// models.PetOwner.belongsTo(models.User, { foreignKey: "user_id" });
// models.UserAddresses.belongsTo(models.User, { foreignKey: "user_id" });
// models.Pets.belongsTo(models.User, { foreignKey: "pet_owner_id" });
// models.ProviderServiceType.belongsTo(models.User, {
//   foreignKey: "pet_provider_id",
// });

models.PetOwner.hasOne(models.UserAddresses, {
  foreignKey: "address_id",
});

models.PetOwner.hasMany(models.Pets, {
  foreignKey: "pet_id",
});

models.PetProvider.hasOne(models.UserAddresses, {
  foreignKey: "address_id",
});

models.PetProvider.hasMany(models.ProviderServiceType, {
  foreignKey: "service_type",
});
