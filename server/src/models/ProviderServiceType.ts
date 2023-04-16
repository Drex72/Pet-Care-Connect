import { DataTypes, Sequelize, Model } from "sequelize";
import { PetProviderServiceInterface } from "../interfaces/ProviderServiceTypeInformation";

interface PetProviderServiceAttributes extends PetProviderServiceInterface {
  id?: string;
  pet_provider_id: string;
  service_rating?: number;
}
export class PetProviderService
  extends Model<PetProviderServiceAttributes>
  implements PetProviderServiceAttributes
{
  public id!: string;
  public service_name!: string;
  public service_description!: string;
  public service_price_per_hour!: number;
  public pet_provider_id!: string;
  public service_rating?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const ProviderServiceType = (sequelize: Sequelize) => {
  PetProviderService.init(
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
      service_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      pet_provider_id: {
        type: DataTypes.UUID,
        references: {
          model: "pet_provider",
          key: "id",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "provider_service_type",
    }
  );

  return PetProviderService;
};
