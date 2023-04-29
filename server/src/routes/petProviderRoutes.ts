import express from "express";
import bookingsController from "../controllers/BookingsController";
import petProviderController from "../controllers/PetProviderController";
import petProviderServiceController from "../controllers/PetProviderServiceController";
import tokenHandler from "../handlers/TokenHandlers";
import bookingValidation from "../validators/BookingValidation";
import petProviderServiceValidation from "../validators/PetProviderServiceValidation";
import petProviderValidation from "../validators/PetProviderValidation";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

// Pet Provider Auth Routes
router
  .route("/")
  .get(petProviderController.getAllOrOnePetProviders)
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
  .route("/upload-avatar")
  .post(
    tokenHandler.validateAccessTokenMiddleware,
    upload.single("file"),
    petProviderValidation.addPetProviderImageValidation,
    petProviderController.addPetProviderImage
  );

router
  .route("/service")
  .get(petProviderServiceController.getAllPetProviderservices)
  .post(
    tokenHandler.validateAccessTokenMiddleware,
    petProviderServiceValidation.createPetProviderServiceValidation,
    petProviderServiceController.createPetProviderService
  )
  .delete(
    tokenHandler.validateAccessTokenMiddleware,
    petProviderServiceValidation.deletePetProviderValidation,
    petProviderServiceController.deletePetProvider
  );
router
  .route("/bookings")
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.getBookingForUserValidation,
    bookingsController.getAllBookingsForAProvider
  )
  .put(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.updateBookingForUserValidation,
    bookingsController.updateBookingForUser
  );

router
  .route("/bookings/:id")
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.getBookingValidation,
    bookingsController.getABooking
  );

export default router;
