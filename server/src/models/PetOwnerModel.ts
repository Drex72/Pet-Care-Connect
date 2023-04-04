import { DataTypes, Model, Sequelize } from "sequelize";
import { UserInterface } from "../interfaces/BasicUserInterface";
interface PetOwnerAttributes extends UserInterface {
  id?: string;
  user_verified?: boolean;
  address_id: string;
  pet_id: string;
  user_type?: string;
}

export class PetOwner
  extends Model<PetOwnerAttributes>
  implements PetOwnerAttributes
{
  public id?: string;
  public email!: string;
  public password!: string;
  public user_verified!: boolean;
  public first_name!: string;
  public last_name!: string;
  public phone_number!: string;
  public address_id!: string;
  public pet_id!: string;
  public user_type!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const PetOwnerModel = (sequelize: Sequelize) => {
  PetOwner.init(
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
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      user_type: {
        type: DataTypes.ENUM("PET-PROVIDER", "PET-OWNER"),
        allowNull: false,
        defaultValue: "PET-OWNER",
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
      sequelize,
      freezeTableName: true,
      modelName: "pet_owner",
    }
  );
  return PetOwner;
};
