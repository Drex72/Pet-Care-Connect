import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import BookingService from "../services/BookingService";
import ProviderServicesService from "../services/ProviderServiceTypeService";

class BookingsController {
  bookingService: BookingService;
  constructor() {
    this.bookingService = new BookingService();
  }
  /**
   *
   * @param req
   * @param res
   */
  bookNewPetProvider = async (req: Request, res: Response) => {};

  /**
   *
   * @param req
   * @param res
   */
  getABooking = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const currentPetOwner = await this.bookingService.getBooking(id);
      // res.status(currentPetOwner.statusCode).send(currentPetOwner.response);
    } catch (e) {
      res.status(500).send(`Error while fetching Pet Owner, ${e}`);
    }
  };

  /**
   *
   * @param req
   * @param res
   */
  getAllBookings = async (req: Request, res: Response) => {};

  /**
   *
   * @param req
   * @param res
   */
  updateABooking = async (req: Request, res: Response) => {};

  /**
   *
   * @param req
   * @param res
   */
  deleteABooking = async (req: Request, res: Response) => {};
}

const bookingsController = new BookingsController();
export default bookingsController;
