import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import ApiErrorException from "../exceptions/ApiErrorException";
import {
  joiErrorFormatter,
  schemaOptions,
  userTypeValidationSchema,
} from "./schemaOptions";

class PetOwnerValidation {
  /**
   * Validates the request coming in
   * @param req Takes in the Request Body
   * @param _
   * @param next
   * @returns
   */
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
      pet_birthday: Joi.string().required(),
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

    req.body = { ...value, user_type: 'PET-OWNER' };
    return next();
  }

  /**
   * Validates the Request params coming in for getting a pet owner
   * @param req
   * @param _
   * @param next
   * @returns
   */
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

  /**
   * Validates the Request params coming in for updating a pet owner
   * @param req
   * @param _
   * @param next
   * @returns
   */
  async updatePetOwnerValidation(
    req: Request,
    _: Response,
    next: NextFunction
  ) {
    const { body } = req;

    // Create User Schema
    const updatePetOwnerValidationSchema: Joi.ObjectSchema = Joi.object({
      first_ame: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required().min(10).max(30),
      pet_type: Joi.string().required(),
      pet_name: Joi.string().required(),
      pet_breed: Joi.string().required(),
      pet_birthday: Joi.string().required(),
      pet_gender: Joi.string().required(),
      pet_special_needs: Joi.string().optional(),
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

  /**
   * Validates the Request params coming in for deleting a pet owner
   * @param req
   * @param _
   * @param next
   * @returns void
   */
  async deletePetOwnerValidation(
    req: Request,
    _: Response,
    next: NextFunction
  ) {
    const { params } = req;

    // Create User Schema
    const deleteAPetOwnerValidationSchema: Joi.ObjectSchema = Joi.object({
      id: Joi.string().length(36).required(),
    });

    const { error, value } = deleteAPetOwnerValidationSchema.validate(
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

  /**
   * Custom Validation for the pet gender
   */
  private petGenderValidation() {
    Joi.extend((joi) => {
      return {
        type: "petGenderValidation",
        base: joi.string(),
        messages: {
          "petGenderValidation.invalid":
            "{{#label}} must be a either type male or type female",
        },

        validate(value, helpers) {
          const allowedTypes = ["male", "female"];
          if (!allowedTypes.includes(value)) {
            return {
              value,
              errors: helpers.error("petGenderValidation.invalid"),
            };
          }
          return value;
        },
      };
    });
  }
}

const petOwnerValidation = new PetOwnerValidation();
export default petOwnerValidation;
