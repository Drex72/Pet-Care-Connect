import express from "express";
import authController from "../controllers/AuthController";
import petProviderController from "../controllers/PetProviderController";
import tokenHandler from "../handlers/TokenHandlers";
import authValidation from "../validators/AuthValidation";
import petOwnerValidation from "../validators/PetOwnerValidation";
import petProviderValidation from "../validators/PetProviderValidation";

const router = express.Router();

// Sign Up Endpoint
router.post(
  "/register/pet-owner",
  petOwnerValidation.createPetOwnerValidation,
  authController.registerPetOwner
);
router.post(
  "/register/pet-provider",
  petProviderValidation.createPetProviderValidation,
  authController.registerPetProvider
);

// Login Endpoint
router.post(
  "/login",
  authValidation.userLoginValidation,
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
  authController.sendVerificationEmail
);

router.post(
  "/verify-email/validate",
  authValidation.verifyEmailValidation,
  authController.validateSentOtp
);

// Endpoint for Refreshing Access Tokens
router.post(
  "/refresh",
  authValidation.sendNewAccessTokenValidation,
  tokenHandler.refreshAccessToken
);

export default router;
