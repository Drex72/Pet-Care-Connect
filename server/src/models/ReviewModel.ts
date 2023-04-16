import { DataTypes, Sequelize, Model } from "sequelize";

export interface ReviewModelInterface {
  id?: string;
  pet_provider_id: string;
  pet_owner_id: string;
  service_type_id: string;
  rating: number;
  comment: string;
}

export class Review
  extends Model<ReviewModelInterface>
  implements ReviewModelInterface
{
  public id!: string;
  public pet_provider_id!: string;
  public pet_owner_id!: string;
  public service_type_id!: string;
  public rating!: number;
  public comment!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const ReviewModel = (sequelize: Sequelize) => {
  Review.init(
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
      service_type_id: {
        type: DataTypes.UUID,
        references: {
          model: "provider_service_type",
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
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "reviews",
    }
  );

  return Review;
};
