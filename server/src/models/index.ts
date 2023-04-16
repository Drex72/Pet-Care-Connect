import { sequelize } from "../config/database";
import { BookingModel } from "./BookingModel";
import { OTPModel } from "./OTPModel";
import { PetModel } from "./PetModel";
import { PetOwnerModel } from "./PetOwnerModel";
import { PetProviderModel } from "./PetProviderModel";
import { ProviderServiceType } from "./ProviderServiceType";
import { ReviewModel } from "./ReviewModel";
export const models = {
  PetOwner: PetOwnerModel(sequelize),
  PetProvider: PetProviderModel(sequelize),
  ProviderServiceType: ProviderServiceType(sequelize),
  Pets: PetModel(sequelize),
  Booking: BookingModel(sequelize),
  Review: ReviewModel(sequelize),
  OTP: OTPModel(sequelize),
};

models.Pets.belongsTo(models.PetOwner, {
  foreignKey: "pet_owner_id",
  onDelete: "CASCADE",
});

models.ProviderServiceType.belongsTo(models.PetProvider, {
  foreignKey: "pet_provider_id",
  onDelete: "CASCADE",
});

models.PetProvider.hasMany(models.ProviderServiceType, {
  onDelete: "CASCADE",
});
models.PetOwner.hasMany(models.Pets, {
  onDelete: "CASCADE",
});

// Booking Associations
models.PetOwner.hasMany(models.Booking, {
  onDelete: "CASCADE",
  sourceKey: "id",
  foreignKey: "pet_owner_id",
});
models.Booking.belongsTo(models.PetOwner, {
  foreignKey: "pet_owner_id",
  onDelete: "CASCADE",
});

models.PetProvider.hasMany(models.Booking, {
  onDelete: "CASCADE",
  sourceKey: "id",
  foreignKey: "pet_provider_id",
});
models.Booking.belongsTo(models.PetProvider, {
  foreignKey: "pet_provider_id",
  onDelete: "CASCADE",
});

models.ProviderServiceType.hasMany(models.Booking, {
  onDelete: "CASCADE",
  sourceKey: "id",
  foreignKey: "service_type_id",
});
models.Booking.belongsTo(models.ProviderServiceType, {
  foreignKey: "service_type_id",
  onDelete: "CASCADE",
});

// Review Associations
models.PetProvider.hasMany(models.Review, {
  onDelete: "CASCADE",
  sourceKey: "id",
  foreignKey: "pet_provider_id",
});
models.Review.belongsTo(models.PetProvider, {
  foreignKey: "pet_provider_id",
  onDelete: "CASCADE",
});

models.ProviderServiceType.hasMany(models.Review, {
  onDelete: "CASCADE",
  sourceKey: "id",
  foreignKey: "service_type_id",
});
models.Review.belongsTo(models.ProviderServiceType, {
  foreignKey: "service_type_id",
  onDelete: "CASCADE",
});

models.PetOwner.hasMany(models.Review, {
  onDelete: "CASCADE",
  sourceKey: "id",
  foreignKey: "pet_owner_id",
});
models.Review.belongsTo(models.PetOwner, {
  foreignKey: "pet_owner_id",
  onDelete: "CASCADE",
});
