import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import BookingService from "../services/BookingService";
import ProviderServicesService from "../services/ProviderServiceTypeService";
import ReviewService from "../services/ReviewService";

class ReviewsController {
  reviewsService: ReviewService;
  constructor() {
    this.reviewsService = new ReviewService();
  }

  createNewReview = async (req: Request, res: Response) => {
    const reviewInformation = {
      pet_owner_id: req.body.pet_owner_id,
      pet_provider_id: req.body.pet_provider_id,
      service_type_id: req.body.service_type_id,
      rating: req.body.rating,
      comment: req.body.comment,
    };

    try {
      const createdReview = await this.reviewsService.createNewReview(
        reviewInformation
      );
      return res.status(createdReview.statusCode).send(createdReview.response);
    } catch (error) {
      return res.status(500).send(`Error while Creating Review, ${error}`);
    }
  };

  getAllReviewsForAProvider = async (req: Request, res: Response) => {
    const { pet_provider_id } = req.query;
    try {
      const allReviews = await this.reviewsService.getAllReviewsForProvider(
        pet_provider_id as string
      );
      return res.status(allReviews.statusCode).send(allReviews.response);
    } catch (e) {
      return res.status(500).send(`Error while fetching Reviews, ${e}`);
    }
  };
}

const reviewsController = new ReviewsController();
export default reviewsController;
