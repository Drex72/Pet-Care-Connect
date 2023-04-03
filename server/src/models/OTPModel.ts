import { DataTypes, Sequelize } from "sequelize";

export const OTPModel = (sequelize: Sequelize) => {
  return sequelize.define(
    "otp",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "user",
          key: "email",
        },
      },
      otp: {
        type: DataTypes.INTEGER({ length: 6 }),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
};
