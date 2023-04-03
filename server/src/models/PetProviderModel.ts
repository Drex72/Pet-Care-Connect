import { DataTypes, Sequelize } from "sequelize";

export const PetProviderModel = (sequelize: Sequelize) => {
  return sequelize.define(
    "pet_provider",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "user",
          key: "id",
        },
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_id: {
        type: DataTypes.UUID,
        references: {
          model: "user_addresses",
          key: "id",
        },
      },
      service_type: {
        type: DataTypes.UUID,
        references: {
          model: "provider_service_type",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
};
