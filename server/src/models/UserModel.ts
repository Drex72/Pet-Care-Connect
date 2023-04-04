import { DataTypes, Sequelize, Model } from "sequelize";

export const UserModel = (sequelize: Sequelize) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_verified: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      user_type: {
        type: DataTypes.ENUM("PET-PROVIDER", "PET-OWNER"),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
};
