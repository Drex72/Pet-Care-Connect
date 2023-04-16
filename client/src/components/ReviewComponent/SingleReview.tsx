import React from "react";
import "./SingleReviewStyles.scss";
import userimage from "../../assets/images/image1.svg";
import { AiFillStar } from "react-icons/ai";
import { ReviewInterface } from "../../interfaces/ReviewInterface";
import { formatDate } from "../../utils/formatReviewDate";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const SingleReview = ({ review }: { review: ReviewInterface }) => {
  return (
    <div className="review_containers">
      <div className="review_containers_inner">
        <div className="review_containers_header">
          <div className="review_containers_header_avatar_info">
            <div className="avatar_container">
              <img
                src={review.pet_owner.user_avatar ?? userimage}
                alt="Avatar"
              />
            </div>
            <h2 className="avatar_name">
              {review.pet_owner.first_name} {review.pet_owner.last_name}
            </h2>
          </div>

          <i className="review_container_header_date">
            {formatDate(review.createdAt)}
          </i>
        </div>

        <div className="review_containers_ratings">
          <div className="star_container">
            <Stack spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={review?.rating ?? 0}
                precision={0.5}
                readOnly
              />
            </Stack>
          </div>
        </div>

        <h2 className="review_containers_service_name">
          {review.provider_service_type.service_name}
        </h2>
        <p className="review_containers_comment">{review.comment}</p>
      </div>
    </div>
  );
};

export default SingleReview;
