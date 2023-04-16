import { Request } from "express";
import { Op, Sequelize } from "sequelize";
import responseHandler from "../handlers/ResponseHandler";
import {
  BookingRequestInterface,
  BookingStatus,
} from "../interfaces/BookingRequestInterface";
import { models } from "../models";
import { Booking } from "../models/BookingModel";
import { Review, ReviewModelInterface } from "../models/ReviewModel";

class ReviewService {
  private reviewModel: typeof Review;
  constructor() {
    this.reviewModel = models.Review;
  }

  private bookingNotFound() {
    return responseHandler.responseError(
      400,
      "Review with Given id does not Exist"
    );
  }
  async createNewReview(reviewInformation: Omit<ReviewModelInterface, "id">) {
    try {
      const currentPetOwner = await models.PetOwner.findOne({
        where: { id: reviewInformation.pet_owner_id },
      });
      if (!currentPetOwner) {
        return responseHandler.responseError(400, "Pet Owner not Found");
      }
      const currentPetProvider = await models.PetProvider.findOne({
        where: { id: reviewInformation.pet_provider_id },
      });
      if (!currentPetProvider) {
        return responseHandler.responseError(400, "Pet Provider not Found");
      }
      const currentService = await models.ProviderServiceType.findOne({
        where: {
          id: reviewInformation.service_type_id,
          pet_provider_id: reviewInformation.pet_provider_id,
        },
      });
      if (!currentService) {
        return responseHandler.responseError(400, "Service not Found");
      }

      const formerRatings = await models.Review.findAll({
        where: { pet_provider_id: reviewInformation.pet_provider_id },
      });

      let newRatings;
      let newServiceTypeRating;
      if (!formerRatings.length) {
        newRatings = reviewInformation.rating;
        newServiceTypeRating = reviewInformation.rating;
      } else {
        const totalRatings =
          currentPetProvider.overall_provider_rating! * formerRatings.length +
          reviewInformation.rating;

        const totalServiceRating =
          currentService.service_rating! * formerRatings.length +
          reviewInformation.rating;
        const dividedRatings = totalRatings / (formerRatings.length + 1);
        newRatings = Number(dividedRatings.toFixed(1));
        newServiceTypeRating = totalServiceRating;
      }

      await models.PetProvider.update(
        { overall_provider_rating: newRatings },
        {
          where: { id: reviewInformation.pet_provider_id },
        }
      );
      await models.ProviderServiceType.update(
        { service_rating: newServiceTypeRating },
        {
          where: { id: reviewInformation.service_type_id },
        }
      );

      const createdReview = await this.reviewModel.create(reviewInformation);

      return responseHandler.responseSuccess(
        200,
        "Review Created Successfully",
        {
          createdReview,
        }
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Creating Review ${JSON.stringify(error)}`
      );
    }
  }

  async getAllReviewsForProvider(id: string) {
    try {
      const currentPetProvider = await models.PetProvider.findOne({
        where: { id },
      });
      if (!currentPetProvider) {
        return responseHandler.responseError(400, "User  not Found");
      }
      const allReviews = await this.reviewModel.findAll({
        where: { pet_provider_id: currentPetProvider.id },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: models.PetOwner,
            attributes: this.getReviewAttributes().ownerAttributes as string[],
          },
          {
            model: models.PetProvider,

            attributes: this.getReviewAttributes()
              .providerAttributes as string[],
          },
          {
            model: models.ProviderServiceType,
            attributes: this.getReviewAttributes()
              .providerServiceAttributes as string[],
          },
        ],
      });

      return responseHandler.responseSuccess(
        200,
        "All Reviews Found Successfully",
        {
          allReviews,
        }
      );
    } catch (error) {
      return responseHandler.responseError(
        400,
        `Error Fetching Reviews ${JSON.stringify(error)}`
      );
    }
  }

  private getReviewAttributes() {
    return {
      ownerAttributes: [
        ["id", "pet_owner_id"],
        "email",
        "user_type",
        "first_name",
        "phone_number",
        "last_name",
        "street",
        "city",
        "postal_code",
        "region",
        "user_avatar",
      ],
      providerAttributes: [
        ["id", "pet_provider_id"],
        "email",
        "user_type",
        "first_name",
        "phone_number",
        "last_name",
        "street",
        "city",
        "postal_code",
        "region",
        "user_avatar",
      ],
      providerServiceAttributes: [
        ["id", "service_type_id"],
        "service_name",
        "service_description",
        "service_price_per_hour",
        "service_rating",
      ],
    };
  }
}

export default ReviewService;
