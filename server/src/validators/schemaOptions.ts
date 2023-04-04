import Joi from "joi";

// Schema Options
export const schemaOptions: Joi.ValidationOptions = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

export const joiErrorFormatter = (error: Joi.ValidationError) => {
  return error.details
    .map((detail) => {
      return detail.message;
    })
    .join(", ");
};

export const userTypeValidationSchema = Joi.extend((joi) => {
  return {
    type: "userTypeValidation",
    base: joi.string(),
    messages: {
      "userTypeValidation.invalid":
        "{{#label}} must be a either type PET-PROVIDER or type PET-OWNER",
    },

    validate(value, helpers) {
      const allowedTypes = ["PET-PROVIDER", "PET-OWNER"];
      if (!allowedTypes.includes(value)) {
        return {
          value,
          errors: helpers.error("userTypeValidation.invalid"),
        };
      }
      return value;
    },
  };
});

export const bookingStatusValidationSchema = Joi.extend((joi) => {
  return {
    type: "bookingStatusValidation",
    base: joi.string(),
    messages: {
      "bookingStatusValidation.invalid":
        "{{#label}} must be a either type REJECTED, CONFIRMED or type PENDING",
    },

    validate(value, helpers) {
      const allowedTypes = ["REJECTED", "CONFIRMED", "PENDING"];
      if (!allowedTypes.includes(value)) {
        return {
          value,
          errors: helpers.error("bookingStatusValidation.invalid"),
        };
      }
      return value;
    },
  };
});
