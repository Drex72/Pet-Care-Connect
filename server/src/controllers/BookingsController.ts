import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import ProviderServicesService from "../services/ProviderServicesService";

class BookingsController {
  constructor() {}
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
  getABooking = async (req: Request, res: Response) => {};

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
