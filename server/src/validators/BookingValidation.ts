import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import ApiErrorException from "../exceptions/ApiErrorException";
import {
  bookingStatusValidationSchema,
  joiErrorFormatter,
  schemaOptions,
} from "./schemaOptions";

class BookingValidation {
  async createNewBookingValidation(
    req: Request,
    _: Response,
    next: NextFunction
  ) {
    const { body } = req;

    // Create User Schema
    const createNewBookingValidationSchema: Joi.ObjectSchema = Joi.object({
      pet_owner_id: Joi.string().length(36).required(),
      pet_provider_id: Joi.string().length(36).required(),
      service_type_id: Joi.string().length(36).required(),
      date: Joi.date().required(),
      time: Joi.string().required(),
      status: bookingStatusValidationSchema
        .bookingStatusValidation()
        .required(),
    });

    const { error, value } = createNewBookingValidationSchema.validate(
      body,
      schemaOptions
    );

    // If Error, handle Error
    if (error) {
      // Add our Error handler
      return next(new ApiErrorException(joiErrorFormatter(error), 400));
    }

    req.body = { ...value, status: body?.status };
    return next();
  }

  async getBookingForUserValidation(req: Request, _: Response, next: NextFunction) {
    const { query } = req;

    // Create User Schema
    const getBookingValidationSchema: Joi.ObjectSchema = Joi.object({
      id: Joi.string().length(36).required(),
    });

    const { error, value } = getBookingValidationSchema.validate(
      query,
      schemaOptions
    );

    // If Error, handle Error
    if (error) {
      // Add our Error handler
      return next(new ApiErrorException(joiErrorFormatter(error), 400));
    }

    req.body = value;
    return next();
  }

  async getBookingValidation(req: Request, _: Response, next: NextFunction) {
    const { params } = req;

    // Create User Schema
    const getBookingValidationSchema: Joi.ObjectSchema = Joi.object({
      id: Joi.string().length(36).required(),
    });

    const { error, value } = getBookingValidationSchema.validate(
      params,
      schemaOptions
    );

    // If Error, handle Error
    if (error) {
      // Add our Error handler
      return next(new ApiErrorException(joiErrorFormatter(error), 400));
    }

    req.body = value;
    return next();
  }

  async deleteBookingValidation(req: Request, _: Response, next: NextFunction) {
    const { query } = req;

    // Create User Schema
    const deleteBookingValidationSchema: Joi.ObjectSchema = Joi.object({
      id: Joi.string().length(36).required(),
    });

    const { error, value } = deleteBookingValidationSchema.validate(
      query,
      schemaOptions
    );

    // If Error, handle Error
    if (error) {
      // Add our Error handler
      return next(new ApiErrorException(joiErrorFormatter(error), 400));
    }

    req.body = value;
    return next();
  }
}

const bookingValidation = new BookingValidation();
export default bookingValidation;
