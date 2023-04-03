import express from "express";
import bookingsController from "../controllers/BookingsController";
import petProviderController from "../controllers/PetProviderController";
import tokenHandler from "../handlers/TokenHandlers";
import bookingValidation from "../validators/BookingValidation";
import petProviderValidation from "../validators/PetProviderValidation";

const router = express.Router();

// Pet Provider Auth Routes
router
  .route("/")
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    petProviderValidation.getAPetProviderValidation,
    petProviderController.getAllPetProviders
  )
  .put(
    tokenHandler.validateAccessTokenMiddleware,
    petProviderValidation.updatePetProviderValidation,
    petProviderController.updatePetProvider
  )
  .delete(
    tokenHandler.validateAccessTokenMiddleware,
    petProviderValidation.deletePetProviderValidation,
    petProviderController.deletePetProvider
  );

router
  .route("/:id")
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    petProviderValidation.getAPetProviderValidation,
    petProviderController.getAPetProvider
  );

router
  .route("/bookings")
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.getBooking,
    bookingsController.getAllBookings
  )
  .put(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.updateBooking,
    bookingsController.updateABooking
  );

router
  .route("/bookings/:id")
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.getBooking,
    bookingsController.getABooking
  );

export default router;
