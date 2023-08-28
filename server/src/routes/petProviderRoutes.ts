import express from "express";
import bookingsController from "../controllers/BookingsController";
import petProviderController from "../controllers/PetProviderController";
import petProviderServiceController from "../controllers/PetProviderServiceController";
import tokenHandler from "../handlers/TokenHandlers";
import bookingValidation from "../validators/BookingValidation";
import petProviderServiceValidation from "../validators/PetProviderServiceValidation";
import petProviderValidation from "../validators/PetProviderValidation";
import multer from "multer";
import sqlInjectionValidation from "../validators/SQLInjectionValidator";

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
    sqlInjectionValidation.bodyContentValidation,
    petProviderController.updatePetProvider
  )
  .delete(
    tokenHandler.validateAccessTokenMiddleware,
    petProviderValidation.deletePetProviderValidation,
    sqlInjectionValidation.queryContentValidation,
    petProviderController.deletePetProvider
  );

router
  .route("/upload-avatar")
  .post(
    tokenHandler.validateAccessTokenMiddleware,
    upload.single("file"),
    petProviderValidation.addPetProviderImageValidation,
    sqlInjectionValidation.bodyContentValidation,
    petProviderController.addPetProviderImage
  );

router
  .route("/service")
  .get(petProviderServiceController.getAllPetProviderservices)
  .post(
    tokenHandler.validateAccessTokenMiddleware,
    petProviderServiceValidation.createPetProviderServiceValidation,
    sqlInjectionValidation.bodyContentValidation,
    petProviderServiceController.createPetProviderService
  )
  .delete(
    tokenHandler.validateAccessTokenMiddleware,
    petProviderServiceValidation.deletePetProviderValidation,
    sqlInjectionValidation.queryContentValidation,
    petProviderServiceController.deletePetProvider
  );
router
  .route("/bookings")
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.getBookingForUserValidation,
    sqlInjectionValidation.queryContentValidation,
    bookingsController.getAllBookingsForAProvider
  )
  .put(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.updateBookingForUserValidation,
    sqlInjectionValidation.bodyContentValidation,
    bookingsController.updateBookingForUser
  );

router
  .route("/bookings/:id")
  .get(
    tokenHandler.validateAccessTokenMiddleware,
    bookingValidation.getBookingValidation,
    sqlInjectionValidation.paramsContentValidation,
    bookingsController.getABooking
  );

export default router;
