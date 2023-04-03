import { DataTypes, Sequelize } from "sequelize";

export const ReviewModel = (sequelize: Sequelize) => {
  return sequelize.define(
    "review_model",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },

      pet_provider_id: {
        type: DataTypes.UUID,
        references: {
          model: "pet_provider",
          key: "id",
        },
      },
      pet_owner_id: {
        type: DataTypes.UUID,
        references: {
          model: "pet_owner",
          key: "id",
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
};
