import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import BookingService from "../services/BookingService";
import ProviderServicesService from "../services/ProviderServiceTypeService";

class BookingsController {
  bookingService: BookingService;
  constructor() {
    this.bookingService = new BookingService();
  }

  bookNewPetProvider = async (req: Request, res: Response) => {
    const bookingInformation = {
      pet_owner_id: req.body.pet_owner_id,
      pet_provider_id: req.body.pet_provider_id,
      service_type_id: req.body.service_type_id,
      date: req.body.date,
      time: req.body.time,
      duration: req.body.duration,
    };

    try {
      const createdBooking = await this.bookingService.createNewBooking(
        bookingInformation
      );
      return res
        .status(createdBooking.statusCode)
        .send(createdBooking.response);
    } catch (error) {
      return res.status(500).send(`Error while Creating Booking, ${error}`);
    }
  };

  updateBookingForUser = async (req: Request, res: Response) => {
    const { id, status } = req.body;
    console.log(id, status, 'hey')
    try {
      const updatedBooking = await this.bookingService.updateBooking(
        id as string,
        status
      );
      return res
        .status(updatedBooking.statusCode)
        .send(updatedBooking.response);
    } catch (e) {
      return res.status(500).send(`Error while updating Booking, ${e}`);
    }
  };

  getAllBookingsForAUser = async (req: Request, res: Response) => {
    const { id } = req.query;
    try {
      const currentBooking = await this.bookingService.getBookingsForUser(
        id as string
      );
      return res
        .status(currentBooking.statusCode)
        .send(currentBooking.response);
    } catch (e) {
      return res.status(500).send(`Error while fetching Booking, ${e}`);
    }
  };
  getAllBookingsForAProvider = async (req: Request, res: Response) => {
    const { id } = req.query;
    try {
      const currentBooking = await this.bookingService.getBookingsForProvider(
        id as string
      );
      return res
        .status(currentBooking.statusCode)
        .send(currentBooking.response);
    } catch (e) {
      return res.status(500).send(`Error while fetching Booking, ${e}`);
    }
  };

  getABooking = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const currentBooking = await this.bookingService.getBooking(id);
      return res
        .status(currentBooking.statusCode)
        .send(currentBooking.response);
    } catch (e) {
      return res.status(500).send(`Error while Fetching Booking, ${e}`);
    }
  };

  deleteABooking = async (req: Request, res: Response) => {
    const { id } = req.query;
    try {
      const deletedBooking = await this.bookingService.deleteABooking(
        id as string
      );
      return res
        .status(deletedBooking.statusCode)
        .send(deletedBooking.response);
    } catch (e) {
      return res.status(500).send(`Error while Deleting Booking, ${e}`);
    }
  };
}

const bookingsController = new BookingsController();
export default bookingsController;
