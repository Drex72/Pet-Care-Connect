import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import ApiErrorException from "../exceptions/ApiErrorException";
import {
  bookingStatusValidationSchema,
  joiErrorFormatter,
  schemaOptions,
} from "./schemaOptions";

class ReviewsValidation {
  async createNewReviewValidation(
    req: Request,
    _: Response,
    next: NextFunction
  ) {
    const { body } = req;

    // Create User Schema
    const createNewReviewValidationSchema: Joi.ObjectSchema = Joi.object({
      pet_owner_id: Joi.string().length(36).required(),
      pet_provider_id: Joi.string().length(36).required(),
      service_type_id: Joi.string().length(36).required(),
      rating: Joi.number().required(),
      comment: Joi.string().required(),
    });

    const { error, value } = createNewReviewValidationSchema.validate(
      body,
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

  async getAllReviewsForAUserValidation(
    req: Request,
    _: Response,
    next: NextFunction
  ) {
    const { query } = req;

    // Create User Schema
    const getReviewsForUserValidationSchema: Joi.ObjectSchema = Joi.object({
      pet_provider_id: Joi.string().length(36).required(),
    });

    const { error, value } = getReviewsForUserValidationSchema.validate(
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

const reviewsValidation = new ReviewsValidation();
export default reviewsValidation;
