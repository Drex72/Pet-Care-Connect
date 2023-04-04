import { DataTypes, Sequelize, Model } from "sequelize";
import { UserAddressesInformationInterface } from "../interfaces/UserAddressesInformationInterface";
interface UserAddressesModelAttributes
  extends UserAddressesInformationInterface {
  id?: string;
}
export class UserAddresses
  extends Model<UserAddressesModelAttributes>
  implements UserAddressesModelAttributes
{
  public id!: string;
  public street!: string;
  public city!: string;
  public postal_code!: number;
  public region!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export const UserAddressesModel = (sequelize: Sequelize) => {
  UserAddresses.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
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
        type: DataTypes.INTEGER,
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
      modelName: "user_addresses",
    }
  );
  return UserAddresses;
};
