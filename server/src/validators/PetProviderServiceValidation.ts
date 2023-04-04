import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import ApiErrorException from "../exceptions/ApiErrorException";
import {
  joiErrorFormatter,
  schemaOptions,
  userTypeValidationSchema,
} from "./schemaOptions";

class PetProviderServiceValidation {
  async createPetProviderServiceValidation(
    req: Request,
    _: Response,
    next: NextFunction
  ) {
    const { body } = req;

    // Create User Schema
    const createPetProviderServiceValidationSchema: Joi.ObjectSchema =
      Joi.object({
        service_name: Joi.string().required(),
        service_description: Joi.string().optional(),
        service_price_per_hour: Joi.number().required(),
        pet_provider_id: Joi.string().length(36).required(),
      });

    const { error, value } = createPetProviderServiceValidationSchema.validate(
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
  async getAPetProviderServiceValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { params } = req;

    // Create User Schema
    const getAPetProviderValidationSchema: Joi.ObjectSchema = Joi.object({
      id: Joi.string().length(36).required(),
    });

    const { error, value } = getAPetProviderValidationSchema.validate(
      params,
      schemaOptions
    );

    // If Error, handle Error
    if (error) {
      // Add our Error handler
      return next(new ApiErrorException(joiErrorFormatter(error), 400));
    }

    req.params = value;
    return next();
  }
  async updatePetProviderValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {}
  async deletePetProviderValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { query } = req;

    // Create User Schema
    const deleteAPetProviderValidationSchema: Joi.ObjectSchema = Joi.object({
      id: Joi.string().length(36).required(),
    });

    const { error, value } = deleteAPetProviderValidationSchema.validate(
      query,
      schemaOptions
    );

    // If Error, handle Error
    if (error) {
      // Add our Error handler
      return next(new ApiErrorException(joiErrorFormatter(error), 400));
    }

    req.params = value;
    return next();
  }
}

const petProviderServiceValidation = new PetProviderServiceValidation();
export default petProviderServiceValidation;
