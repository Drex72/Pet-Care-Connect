import { DataTypes, Model, Sequelize } from "sequelize";
import { PetInformationInterface } from "../interfaces/PetInformationInterface";
interface PetAttributes extends PetInformationInterface {
  id?: string;
  pet_owner_id: string;
}

export class Pet extends Model<PetAttributes> implements PetAttributes {
  public id?: string;
  public pet_name!: string;
  public pet_breed!: string;
  public pet_birthday!: string;
  public pet_gender!: "male" | "female";
  public pet_special_needs?: string;
  public pet_owner_id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export const PetModel = (sequelize: Sequelize) => {
  Pet.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
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
      pet_owner_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "pet_owner",
          key: "id",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "pet",
    }
  );
  return Pet;
};
