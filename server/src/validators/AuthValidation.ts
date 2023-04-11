import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiErrorException";
import * as Joi from "joi";
import {
  joiErrorFormatter,
  schemaOptions,
  userTypeValidationSchema,
} from "./schemaOptions";

class AuthValidation {
  // Validation for creating a pet provider
  async createPetProviderValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { body } = req;

    // Create User Schema
    const createPetProviderValidationSchema: Joi.ObjectSchema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required().min(10).max(30),
      serviceName: Joi.string().required(),
      serviceDescription: Joi.string().optional(),
      servicePricePerHour: Joi.string().required(),
    });

    // Schema Options
    const schemaOptions: Joi.ValidationOptions = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };

    const { error, value } = createPetProviderValidationSchema.validate(
      body,
      schemaOptions
    );

    // If Error, handle Error
    if (error) {
      const errorMessage = error.details
        .map((detail) => {
          return detail.message;
        })
        .join(", ");
      // Add our Error handler
      return next(new ApiError(errorMessage, 400));
    }

    req.body = value;
    return next();
  }

  async userLoginValidation(req: Request, _: Response, next: NextFunction) {
    const { body } = req;

    // User Login Schema
    const loginUserValidationSchema: Joi.ObjectSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      user_type: userTypeValidationSchema.userTypeValidation().required(),
    });

    const { error, value } = loginUserValidationSchema.validate(
      body,
      schemaOptions
    );

    // If Error, handle Error
    if (error) {
      const errorMessage = error.details
        .map((detail) => {
          return detail.message;
        })
        .join(", ");
      // Add our Error handler
      return next(new ApiError(errorMessage, 400));
    }

    req.body = { ...value, user_type: body?.user_type };
    return next();
  }
  async sendOtpCodeValidation(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    // Create User Schema
    const verifyEmailValidationSchema: Joi.ObjectSchema = Joi.object({
      email: Joi.string().required(),
      user_type: userTypeValidationSchema.userTypeValidation().required(),
    });

    const { error, value } = verifyEmailValidationSchema.validate(
      body,
      schemaOptions
    );

    // If Error, handle Error
    if (error) {
      return next(new ApiError(joiErrorFormatter(error), 400));
    }

    req.body = { ...value, user_type: body?.user_type };
    return next();
  }
  async verifyEmailValidation(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    // Create User Schema
    const verifyEmailValidationSchema: Joi.ObjectSchema = Joi.object({
      otp: Joi.string().length(6).required(),
      email: Joi.string().required(),
      user_type: userTypeValidationSchema.userTypeValidation().required(),
    });

    const { error, value } = verifyEmailValidationSchema.validate(
      body,
      schemaOptions
    );

    // If Error, handle Error
    if (error) {
      return next(new ApiError(joiErrorFormatter(error), 400));
    }

    req.body = { ...value, user_type: body?.user_type };
    return next();
  }
  async sendNewAccessTokenValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { body } = req;

    // Create User Schema
    const sendNewAccessTokenValidationSchema: Joi.ObjectSchema = Joi.object({
      refreshToken: Joi.string().required(),
    });

    const { error, value } = sendNewAccessTokenValidationSchema.validate(
      body,
      schemaOptions
    );

    // If Error, handle Error
    if (error) {
      return next(new ApiError(joiErrorFormatter(error), 400));
    }

    req.body = value;
    return next();
  }
}

const authValidation = new AuthValidation();
export default authValidation;
