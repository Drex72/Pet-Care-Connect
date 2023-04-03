import { DataTypes, Sequelize } from "sequelize";

export const BookingModel = (sequelize: Sequelize) => {
  return sequelize.define(
    "booking",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },
      pet_owner_id: {
        type: DataTypes.UUID,
        references: {
          model: "pet_owner",
          key: "id",
        },
      },
      pet_provider_id: {
        type: DataTypes.UUID,
        references: {
          model: "pet_provider",
          key: "id",
        },
      },
      service_type_id: {
        type: DataTypes.UUID,
        references: {
          model: "provider_service_type",
          key: "id",
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("rejected", "confirmed", "pending"),
        allowNull: true,
        defaultValue: "pending",
      },
    },
    {
      freezeTableName: true,
    }
  );
};
