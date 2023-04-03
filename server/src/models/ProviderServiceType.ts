import { DataTypes, Sequelize } from "sequelize";

export const ProviderServiceType = (sequelize: Sequelize) => {
  return sequelize.define(
    "provider_service_type",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },
      service_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      service_description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      service_price_per_hour: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pet_provider_id: {
        type: DataTypes.UUID,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
};
