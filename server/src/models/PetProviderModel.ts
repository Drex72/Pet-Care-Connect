import { DataTypes, Sequelize, Model } from "sequelize";
import { UserInterface } from "../interfaces/BasicUserInterface";
import { PetProviderInformationInterface } from "../interfaces/PetProviderInformationInterface";

interface PetProviderAttributes extends UserInterface {
  id?: string;
  address_id: string;
  service_type: string;
  user_verified?: boolean;
  user_type?: string;
}
export class PetProvider
  extends Model<PetProviderAttributes>
  implements PetProviderAttributes
{
  public id!: string;
  public first_name!: string;
  public email!: string;
  public password!: string;
  public last_name!: string;
  public phone_number!: string;
  public address_id!: string;
  public service_type!: string;
  public user_verified!: boolean;
  public user_type!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const PetProviderModel = (sequelize: Sequelize) => {
  PetProvider.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
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
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      user_type: {
        type: DataTypes.ENUM("PET-PROVIDER", "PET-OWNER"),
        allowNull: false,
        defaultValue: "PET-OWNER",
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
      sequelize,
      freezeTableName: true,
      modelName: "pet_provider",
    }
  );

  return PetProvider;
};
