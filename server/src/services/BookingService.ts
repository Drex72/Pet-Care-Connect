import { Request } from "express";
import { Op, Sequelize } from "sequelize";
import responseHandler from "../handlers/ResponseHandler";
import { BookingRequestInterface } from "../interfaces/BookingRequestInterface";
import { models } from "../models";
import { Booking } from "../models/BookingModel";

class BookingService {
  private bookingModel: typeof Booking;
  constructor() {
    this.bookingModel = models.Booking;
  }
  async createNewBooking(bookingInformation: BookingRequestInterface) {
    try {
      const currentPetOwner = await models.PetOwner.findOne({
        where: { id: bookingInformation.pet_owner_id },
      });
      if (!currentPetOwner) {
        return responseHandler.responseError(400, "Pet Owner not Found");
      }
      const currentPetProvider = await models.PetProvider.findOne({
        where: { id: bookingInformation.pet_provider_id },
      });
      if (!currentPetProvider) {
        return responseHandler.responseError(400, "Pet Provider not Found");
      }
      const currentService = await models.ProviderServiceType.findOne({
        where: { id: bookingInformation.service_type_id },
      });
      if (!currentService) {
        return responseHandler.responseError(400, "Service not Found");
      }
      const createdBooking = this.bookingModel.create({
        ...bookingInformation,
      });

      return responseHandler.responseSuccess(
        200,
        "Booking Created Successfully",
        {
          createdBooking,
        }
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Creating Booking ${JSON.stringify(error)}`
      );
    }
  }
  async getBooking(id: string) {
    try {
      const currentBooking = this.bookingModel.findOne({
        where: { id },
      });

      return responseHandler.responseSuccess(
        200,
        "Booking Found Successfully",
        {
          currentBooking,
        }
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Fetching Booking ${JSON.stringify(error)}`
      );
    }
  }
  async getBookingsForUser(id: string) {
    try {
      const currentPetOwner = await models.PetOwner.findOne({
        where: { id },
      });
      if (!currentPetOwner) {
        return responseHandler.responseError(400, "User  not Found");
      }
      const allBookings = await this.bookingModel.findAll({
        where: { pet_owner_id: currentPetOwner.id },
        include: [
          {
            model: models.PetOwner,

            attributes: [
              ["id", "pet_owner_id"],
              "email",
              "user_type",
              "first_name",
              "phone_number",
              "last_name",
              "street",
              "city",
              "postal_code",
              "region",
            ],
          },
        ],
        attributes: ["id", "date", "time", "status"],
      });

      return responseHandler.responseSuccess(
        200,
        "All Bookings Found Successfully",
        {
          allBookings,
        }
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Creating Booking ${JSON.stringify(error)}`
      );
    }
  }
  async deleteABooking(id: string) {
    try {
      const deletedBooking = this.bookingModel.destroy({
        where: { id },
      });

      return responseHandler.responseSuccess(
        204,
        "Booking deleted Successfully",
        {
          deletedBooking,
        }
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Deleting Booking ${JSON.stringify(error)}`
      );
    }
  }
}

export default BookingService;
