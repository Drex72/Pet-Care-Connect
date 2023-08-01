import express from "express";
import authController from "../controllers/AuthController";
import petProviderController from "../controllers/PetProviderController";
import tokenHandler from "../handlers/TokenHandlers";
import authValidation from "../validators/AuthValidation";
import petOwnerValidation from "../validators/PetOwnerValidation";
import petProviderValidation from "../validators/PetProviderValidation";
import sqlInjectionValidation from "../validators/SQLInjectionValidator";

const router = express.Router();

// Sign Up Endpoint
router.post(
  "/register/pet-owner",
  petOwnerValidation.createPetOwnerValidation,
  sqlInjectionValidation.bodyContentValidation,
  authController.registerPetOwner
);
router.post(
  "/register/pet-provider",
  petProviderValidation.createPetProviderValidation,
  sqlInjectionValidation.bodyContentValidation,
  authController.registerPetProvider
);

// Login Endpoint
router.post(
  "/login",
  authValidation.userLoginValidation,
  sqlInjectionValidation.bodyContentValidation,
  authController.loginUser
);

// Logout Route
router.get(
  "/logout",
  tokenHandler.validateAccessTokenMiddleware,
  authController.logOut
);

// Verify User with OTP
router.post(
  "/verify-email",
  authValidation.sendOtpCodeValidation,
  sqlInjectionValidation.bodyContentValidation,
  authController.sendVerificationEmail
);

router.post(
  "/verify-email/validate",
  authValidation.verifyEmailValidation,
  sqlInjectionValidation.bodyContentValidation,
  authController.validateSentOtp
);

router.post(
  "/forgot-password",
  authValidation.sendOtpCodeValidation,
  sqlInjectionValidation.bodyContentValidation,
  authController.sendVerificationEmail
);

router.post(
  "/forgot-password/validate",
  authValidation.resetPasswordValidation,
  sqlInjectionValidation.bodyContentValidation,
  authController.validateSentOtp
);

// Endpoint for Refreshing Access Tokens
router.post(
  "/refresh",
  authValidation.sendNewAccessTokenValidation,
  sqlInjectionValidation.bodyContentValidation,
  tokenHandler.refreshAccessToken
);

export default router;
