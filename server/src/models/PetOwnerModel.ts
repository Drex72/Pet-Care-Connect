import { DataTypes, Sequelize } from "sequelize";

export const PetOwnerModel = (sequelize: Sequelize) => {
  return sequelize.define(
    "pet_owner",
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
      pet_id: {
        type: DataTypes.UUID,
        references: {
          model: "pet",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
};
