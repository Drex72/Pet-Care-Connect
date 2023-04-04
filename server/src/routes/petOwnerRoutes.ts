import express from "express";
import bookingsController from "../controllers/BookingsController";
import petOwnerController from "../controllers/PetOwnerController";
import tokenHandler from "../handlers/TokenHandlers";
import bookingValidation from "../validators/BookingValidation";
import petOwnerValidation from "../validators/PetOwnerValidation";

const router = express.Router();

// Pet Owner Auth Routes
router
  .route("/")
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    petOwnerController.getAllPetOwners
  )
  .put(
    tokenHandler.validateAccessTokenMiddleware,
    petOwnerValidation.updatePetOwnerValidation,
    petOwnerController.updatePetOwner
  )
  .delete(
    tokenHandler.validateAccessTokenMiddleware,
    petOwnerValidation.deletePetOwnerValidation,
    petOwnerController.deletePetOwner
  );

router
  .route("/:id")
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    petOwnerValidation.getAPetOwnerValidation,
    petOwnerController.getAPetOwner
  );

// Booking Routes
router
  .route("/bookings/book-provider")
  .post(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.createNewBookingValidation,
    bookingsController.bookNewPetProvider
  )
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.getBookingValidation,
    bookingsController.getAllBookingsForAUser
  )
  .delete(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.deleteBookingValidation,
    bookingsController.deleteABooking
  );

// router
//   .route("/bookings/:id")
//   .get(
//     tokenHandler.validateAccessTokenMiddleware,
//     bookingValidation.getBookingValidation,
//     bookingsController.getABooking
//   );

router
  .route("/review-pet-provider")
  .post(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.createNewBookingValidation,
    bookingsController.bookNewPetProvider
  )
  .get(
    tokenHandler.validateAccessTokenMiddleware
    // bookingsController.getAllBookings
  )
  // .put(
  //   tokenHandler.validateAccessTokenMiddleware,
  //   bookingValidation.updateBookingValidation,
  //   bookingsController.updateABooking
  // )
  .delete(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.deleteBookingValidation,
    bookingsController.deleteABooking
  );
export default router;
