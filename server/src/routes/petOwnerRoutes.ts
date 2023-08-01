import express from "express";
import bookingsController from "../controllers/BookingsController";
import petOwnerController from "../controllers/PetOwnerController";
import tokenHandler from "../handlers/TokenHandlers";
import bookingValidation from "../validators/BookingValidation";
import petOwnerValidation from "../validators/PetOwnerValidation";
import multer from "multer";
import reviewsValidation from "../validators/ReviewsValidation";
import reviewsController from "../controllers/ReviewController";
import sqlInjectionValidation from "../validators/SQLInjectionValidator";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

// Pet Owner Auth Routes
router
  .route("/")
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    sqlInjectionValidation.queryContentValidation,
    petOwnerController.getAllOrOnePetOwners
  )
  .put(
    tokenHandler.validateAccessTokenMiddleware,
    petOwnerValidation.updatePetOwnerValidation,
    sqlInjectionValidation.bodyContentValidation,
    petOwnerController.updatePetOwner
  )

  .delete(
    tokenHandler.validateAccessTokenMiddleware,
    petOwnerValidation.deletePetOwnerValidation,
    sqlInjectionValidation.queryContentValidation,
    petOwnerController.deletePetOwner
  );

router
  .route("/create-pet")
  .post(
    tokenHandler.validateAccessTokenMiddleware,
    petOwnerValidation.addPetValidation,
    sqlInjectionValidation.bodyContentValidation,
    petOwnerController.addPetForPetOwner
  );
router
  .route("/upload-avatar")
  .post(
    tokenHandler.validateAccessTokenMiddleware,
    upload.single("file"),
    petOwnerValidation.addPetOwnerImageValidation,
    petOwnerController.addPetOwnerImage
  );

// Booking Routes
router
  .route("/bookings")
  .post(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.createNewBookingValidation,
    sqlInjectionValidation.bodyContentValidation,
    bookingsController.bookNewPetProvider
  )
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.getBookingForUserValidation,
    sqlInjectionValidation.queryContentValidation,
    bookingsController.getAllBookingsForAUser
  )
  .put(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.updateBookingForUserValidation,
    sqlInjectionValidation.bodyContentValidation,
    bookingsController.updateBookingForUser
  )
  .delete(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.deleteBookingValidation,
    sqlInjectionValidation.queryContentValidation,
    bookingsController.deleteABooking
  );

router
  .route("/review-pet-provider")
  .post(
    tokenHandler.validateAccessTokenMiddleware,
    reviewsValidation.createNewReviewValidation,
    sqlInjectionValidation.bodyContentValidation,
    reviewsController.createNewReview
  )
  .get(
    reviewsValidation.getAllReviewsForAUserValidation,
    sqlInjectionValidation.queryContentValidation,
    reviewsController.getAllReviewsForAProvider
  );

export default router;
