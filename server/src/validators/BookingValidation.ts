import { NextFunction, Request, Response } from "express";

class BookingValidation {
  async createNewBooking(req: Request, res: Response, next: NextFunction) {}
  async getBooking(req: Request, res: Response, next: NextFunction) {}
  async updateBooking(req: Request, res: Response, next: NextFunction) {}
  async deleteBooking(req: Request, res: Response, next: NextFunction) {}
}

const bookingValidation = new BookingValidation();
export default bookingValidation;
