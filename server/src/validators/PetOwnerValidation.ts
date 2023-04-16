import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import ApiErrorException from "../exceptions/ApiErrorException";
import {
  joiErrorFormatter,
  schemaOptions,
  userTypeValidationSchema,
} from "./schemaOptions";

class PetOwnerValidation {
  async createPetOwnerValidation(
    req: Request,
    _: Response,
    next: NextFunction
  ) {
    const { body } = req;

    // Create User Schema
    const createPetOwnerValidationSchema: Joi.ObjectSchema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required().min(10).max(30),
      phone_number: Joi.string().required().min(10).max(30),
      street: Joi.string().required(),
      city: Joi.string().required(),
      postal_code: Joi.string().required(),
      region: Joi.string().required(),
      pet_name: Joi.string().required(),
      pet_breed: Joi.string().required(),
      pet_birthday: Joi.date().required(),
      pet_gender: Joi.string().required(),
      pet_special_needs: Joi.string().optional(),
    });

    const { error, value } = createPetOwnerValidationSchema.validate(
      body,
      schemaOptions
    );

    // If Error, handle Error
    if (error) {
      // Add our Error handler
      return next(new ApiErrorException(joiErrorFormatter(error), 400));
    }

    req.body = { ...value, user_type: "PET-OWNER" };
    return next();
  }

  async getAPetOwnerValidation(req: Request, _: Response, next: NextFunction) {
    const { params } = req;

    // Create User Schema
    const getAPetOwnerValidationSchema: Joi.ObjectSchema = Joi.object({
      id: Joi.string().length(36).required(),
    });

    const { error, value } = getAPetOwnerValidationSchema.validate(
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

  async updatePetOwnerValidation(
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

  async deletePetOwnerValidation(
    req: Request,
    _: Response,
    next: NextFunction
  ) {
    const { query } = req;

    // Create User Schema
    const deleteAPetOwnerValidationSchema: Joi.ObjectSchema = Joi.object({
      id: Joi.string().length(36).required(),
    });

    const { error, value } = deleteAPetOwnerValidationSchema.validate(
      query,
      schemaOptions
    );

    // If Error, handle Error
    if (error) {
      // Add our Error handler
      return next(new ApiErrorException(joiErrorFormatter(error), 400));
    }

    req.query = value;
    return next();
  }
  async addPetOwnerImageValidation(
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
      petOwnerId: Joi.string().length(36).required(),
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

  async addPetValidation(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    // Create User Schema
    const createPetValidationSchema: Joi.ObjectSchema = Joi.object({
      pet_name: Joi.string().required(),
      pet_breed: Joi.string().required(),
      pet_birthday: Joi.date().required(),
      pet_gender: Joi.string().required(),
      pet_special_needs: Joi.string().required(),
    });

    const { error, value } = createPetValidationSchema.validate(
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
}

const petOwnerValidation = new PetOwnerValidation();
export default petOwnerValidation;
