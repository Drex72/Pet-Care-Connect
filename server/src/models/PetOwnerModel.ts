import { DataTypes, Model, Sequelize } from "sequelize";
import { UserInterface } from "../interfaces/BasicUserInterface";
import { UserType } from "../interfaces/UserTypeInterface";
interface PetOwnerAttributes extends UserInterface {
  id?: string;
  user_verified?: boolean;
  user_type?: UserType;
  user_avatar?: string;
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
  public street!: string;
  public city!: string;
  public postal_code!: string;
  public region!: string;
  public user_type!: UserType;
  public user_avatar?: string;

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
      user_avatar: {
        type: DataTypes.STRING,
        allowNull: true,
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
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
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
