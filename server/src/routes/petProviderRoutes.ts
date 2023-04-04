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
  .route("/services")
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.getBookingValidation,
    bookingsController.getAllBookings
  )
  .put(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.updateBookingValidation,
    bookingsController.updateABooking
  )
  .post(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.updateBookingValidation,
    bookingsController.updateABooking
  );
router
  .route("/bookings")
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.getBookingValidation,
    bookingsController.getAllBookings
  )
  .put(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.updateBookingValidation,
    bookingsController.updateABooking
  );

router
  .route("/bookings/:id")
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.getBookingValidation,
    bookingsController.getABooking
  );

export default router;
