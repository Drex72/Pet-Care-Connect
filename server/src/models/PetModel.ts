import { DataTypes, Sequelize } from "sequelize";

export const PetModel = (sequelize: Sequelize) => {
  return sequelize.define(
    "pet",
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
          model: "user",
          key: "id",
        },
      },
      pet_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pet_breed: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pet_birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      pet_gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
      },
      pet_special_needs: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
};
