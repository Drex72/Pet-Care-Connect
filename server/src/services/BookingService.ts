import { Request } from "express";
import { Op, Sequelize } from "sequelize";
import responseHandler from "../handlers/ResponseHandler";
import {
  BookingRequestInterface,
  BookingStatus,
} from "../interfaces/BookingRequestInterface";
import { models } from "../models";
import { Booking } from "../models/BookingModel";

class BookingService {
  private bookingModel: typeof Booking;
  constructor() {
    this.bookingModel = models.Booking;
  }

  private bookingNotFound() {
    return responseHandler.responseError(
      400,
      "Booking with Given id does not Exist"
    );
  }
  async createNewBooking(
    bookingInformation: Omit<BookingRequestInterface, "status">
  ) {
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
      const price =
        currentService.service_price_per_hour * bookingInformation.duration;
      console.log(bookingInformation, price);
      const createdBooking = this.bookingModel.create({
        ...bookingInformation,
        price,
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

  async updateBooking(id: string, status: BookingStatus) {
    try {
      const selectedBooking = await this.bookingModel.findOne({
        where: { id },
      });

      if (!selectedBooking) {
        return this.bookingNotFound();
      }

      const updatedBooking = await this.bookingModel.update(
        { status },
        {
          where: { id },
        }
      );

      return responseHandler.responseSuccess(
        200,
        "Booking Updated Successfully",
        {
          updatedBooking,
        }
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Updating Booking ${JSON.stringify(error)}`
      );
    }
  }
  async getBooking(id: string) {
    try {
      const currentBooking = await this.bookingModel.findOne({
        where: { id },
      });

      if (!currentBooking) {
        return responseHandler.responseError(
          400,
          `Booking with Given Id Does not Exist`
        );
      }

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
            attributes: this.getBoookingsAttributes()
              .ownerAttributes as string[],
          },
          {
            model: models.PetProvider,

            attributes: this.getBoookingsAttributes()
              .providerAttributes as string[],
          },
          {
            model: models.ProviderServiceType,
            attributes: this.getBoookingsAttributes()
              .providerServiceAttributes as string[],
          },
        ],
        attributes: this.getBoookingsAttributes().bookingAttributes,
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
        `Error Fetching Booking ${JSON.stringify(error)}`
      );
    }
  }

  async getBookingsForProvider(id: string) {
    // try {
    const currentPetProvider = await models.PetProvider.findOne({
      where: { id },
    });
    if (!currentPetProvider) {
      return responseHandler.responseError(400, "User  not Found");
    }
    const allBookings = await this.bookingModel.findAll({
      where: { pet_provider_id: currentPetProvider.id },
      include: [
        {
          model: models.PetOwner,

          attributes: this.getBoookingsAttributes().ownerAttributes as string[],
        },

        {
          model: models.ProviderServiceType,
          attributes: this.getBoookingsAttributes()
            .providerServiceAttributes as string[],
        },
      ],
      attributes: this.getBoookingsAttributes().bookingAttributes,
    });

    return responseHandler.responseSuccess(
      200,
      "All Bookings Found Successfully",
      {
        allBookings,
      }
    );
    // } catch (error) {
    //   return responseHandler.responseError(
    //     400,
    //     `Error Fetching Booking ${JSON.stringify(error)}`
    //   );
    // }
  }
  async deleteABooking(id: string) {
    try {
      const selectedBooking = await this.bookingModel.findOne({
        where: { id },
      });

      if (!selectedBooking) {
        return this.bookingNotFound();
      }
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

  private getBoookingsAttributes() {
    return {
      ownerAttributes: [
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
      providerAttributes: [
        ["id", "pet_provider_id"],
        "email",
        "user_type",
        "first_name",
        "phone_number",
        "last_name",
        "street",
        "city",
        "postal_code",
        "region",
        "business_name",
      ],
      providerServiceAttributes: [
        ["id", "service_type_id"],
        "service_name",
        "service_description",
        "service_price_per_hour",
      ],
      bookingAttributes: ["id", "date", "time", "status", "duration", "price"],
    };
  }
}

export default BookingService;
