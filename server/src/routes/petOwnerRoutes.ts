import express from "express";
import bookingsController from "../controllers/BookingsController";
import petOwnerController from "../controllers/PetOwnerController";
import tokenHandler from "../handlers/TokenHandlers";
import bookingValidation from "../validators/BookingValidation";
import petOwnerValidation from "../validators/PetOwnerValidation";
import multer from "multer";
import reviewsValidation from "../validators/ReviewsValidation";
import reviewsController from "../controllers/ReviewController";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

// Pet Owner Auth Routes
router
  .route("/")
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    petOwnerController.getAllOrOnePetOwners
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
  .route("/create-pet")
  .post(
    tokenHandler.validateAccessTokenMiddleware,
    petOwnerValidation.addPetValidation,
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
    bookingsController.bookNewPetProvider
  )
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.getBookingForUserValidation,
    bookingsController.getAllBookingsForAUser
  )
  .put(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.updateBookingForUserValidation,
    bookingsController.updateBookingForUser
  )
  .delete(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.deleteBookingValidation,
    bookingsController.deleteABooking
  );

router
  .route("/review-pet-provider")
  .post(
    tokenHandler.validateAccessTokenMiddleware,
    reviewsValidation.createNewReviewValidation,
    reviewsController.createNewReview
  )
  .get(
    reviewsValidation.getAllReviewsForAUserValidation,
    reviewsController.getAllReviewsForAProvider
  );

export default router;
