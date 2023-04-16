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
      postal_code: Joi.string().required(),
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

    req.body = { ...value, user_type: "PET-PROVIDER" };
    return next();
  }
  async getAPetProviderValidation(
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
    _: Response,
    next: NextFunction
  ) {
    const { body } = req;

    // Create User Schema
    const updatePetOwnerValidationSchema: Joi.ObjectSchema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      phone_number: Joi.string().required().min(10).max(30),
      street: Joi.string().required(),
      city: Joi.string().required(),
      postal_code: Joi.string().required(),
      region: Joi.string().required(),
    });

    const { error, value } = updatePetOwnerValidationSchema.validate(
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
  async addPetProviderImageValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const imageSchema = Joi.object({
      file: Joi.object({
        mimetype: Joi.string()
          .valid("image/jpeg", "image/png", "image/gif")
          .required(),
        size: Joi.number().max(5000000).required(),
        originalname: Joi.string().required(),
      }).required(),
    });

    const imageInformationSchema: Joi.ObjectSchema = Joi.object({
      providerId: Joi.string().length(36).required(),
      providerName: Joi.string().required(),
    });

    const { error, value } = imageSchema.validate(req, schemaOptions);
    const { error: contentError, value: contentValue } =
      imageInformationSchema.validate(req.body, schemaOptions);

    // If Error, handle Error
    if (error) {
      return next(new ApiErrorException(joiErrorFormatter(error), 400));
    }
    if (contentError) {
      return next(new ApiErrorException(joiErrorFormatter(contentError), 400));
    }
    // req.file = value;
    req.body = contentValue;
    return next();
  }
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

const petProviderValidation = new PetProviderValidation();
export default petProviderValidation;
