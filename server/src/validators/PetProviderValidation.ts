import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import ApiErrorException from "../exceptions/ApiErrorException";
import {
  joiErrorFormatter,
  schemaOptions,
  userTypeValidationSchema,
} from "./schemaOptions";

class PetProviderValidation {
  async createPetProviderValidation(
    req: Request,
    _: Response,
    next: NextFunction
  ) {
    const { body } = req;

    // Create User Schema
    const createPetProviderValidationSchema: Joi.ObjectSchema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required().min(10).max(30),
      phone_number: Joi.string().required().min(10).max(30),
      street: Joi.string().required(),
      city: Joi.string().required(),
      postal_code: Joi.number().required(),
      region: Joi.string().required(),
      service_name: Joi.string().required(),
      service_description: Joi.string().optional(),
      service_price_per_hour: Joi.number().required(),
    });

    const { error, value } = createPetProviderValidationSchema.validate(
      body,
      schemaOptions
    );

    // If Error, handle Error
    if (error) {
      // Add our Error handler
      return next(new ApiErrorException(joiErrorFormatter(error), 400));
    }

    req.body = { ...value, user_type: 'PET-PROVIDER' };
    return next();
  }
  async getAPetProviderValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {}
  async updatePetProviderValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {}
  async deletePetProviderValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {}
}

const petProviderValidation = new PetProviderValidation();
export default petProviderValidation;
