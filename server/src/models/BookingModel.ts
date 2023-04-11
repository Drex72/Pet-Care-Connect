import { DataTypes, Model, Sequelize } from "sequelize";
import {
  BookingRequestInterface,
  BookingStatus,
} from "../interfaces/BookingRequestInterface";
interface BookingAttributes extends BookingRequestInterface {
  id?: string;
}

export class Booking
  extends Model<BookingAttributes>
  implements BookingAttributes
{
  public id?: string;
  public pet_owner_id!: string;
  public pet_provider_id!: string;
  public service_type_id!: string;
  public date!: string;
  public time!: string;
  public status?: BookingStatus;
  public duration!: number;
  public price?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const BookingModel = (sequelize: Sequelize) => {
  Booking.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },
      pet_owner_id: {
        type: DataTypes.UUID,
        references: {
          model: "pet_owner",
          key: "id",
        },
      },
      pet_provider_id: {
        type: DataTypes.UUID,
        references: {
          model: "pet_provider",
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
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "REJECTED",
          "CONFIRMED",
          "PENDING",
          "PAYMENTPENDING"
        ),
        allowNull: true,
        defaultValue: "PENDING",
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "booking",
    }
  );
  return Booking;
};
