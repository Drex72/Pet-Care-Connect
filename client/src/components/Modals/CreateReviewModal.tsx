import image from "../../assets/images/femaleAvatar.svg";
import { useForm } from "../../hooks/useForm";
import PopModal from "../../layout/ModelLayout/ModalLayout";
import Button from "../Button/Button";
import Header from "../Header/Header";
import Input, { Dropdown, TextArea } from "../Input/Input";
import { BookingRequestInterface } from "../../interfaces/BookingInterface";
import "./ModalStyles.scss";
import { emptyValidator } from "../../validators/emptyValidator";
import { useEffect, useState } from "react";
import { ProviderServiceType } from "../../interfaces/ProviderServiceTypeInformation";
import { convertProviderServiceTypeToDropdown } from "../../utils/convertProviderSrviceTypeToDropdown";
import { calculateTimeDifferenceInHour } from "../../utils/calculateTimeDifference";
import useApi from "../../hooks/useApi";
import { LoginResponse } from "../../interfaces/LoginInput";
import petOwnerService from "../../services/PetOwnerService";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { ReviewRequestInterface } from "../../interfaces/ReviewInterface";
import { toast } from "react-hot-toast";
import AuthError from "../AuthComponents/AuthError/AuthError";

interface CreateReviewModalProps {
  onClose: () => void;
  modalToggler: boolean;
  pet_owner_id: string;
  pet_provider_id: string;
  pet_provider_services: ProviderServiceType[];
}

const CreateReviewModal = (props: CreateReviewModalProps) => {
  const {
    onClose,
    modalToggler,
    pet_owner_id,
    pet_provider_id,
    pet_provider_services,
  } = props;

  const reviewForm = useForm<ReviewRequestInterface>(
    {
      pet_owner_id,
      pet_provider_id,
      service_type_id: "",
      rating: 0,
      comment: "",
    },
    {
      comment: emptyValidator,
    }
  );

  const handleChangeReviewForm = (
    key: keyof ReviewRequestInterface,
    value: any
  ) => {
    return reviewForm.onChange(key, value);
  };

  // Create Booking Api Request
  const reviewApiService = (data: ReviewRequestInterface) =>
    petOwnerService.reviewPetProvider(data);

  const reviewApiRequest = useApi<LoginResponse, ReviewRequestInterface>(
    reviewApiService
  );

  const handleModalClose = () => {
    reviewForm.reset();
    onClose();
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    reviewApiRequest.reset();

    try {
      const createdReview = await reviewApiRequest.request(reviewForm.form);
      if (createdReview?.code === 200) {
        handleModalClose();
        toast.success("Review Successfully Created!");
      }
    } catch (error) { }
  };

  return (
    <PopModal onClose={handleModalClose} modalToggler={modalToggler}>
      <div className="create_booking_modal">
        <Header message="Review a Pet Care Provider" color="#1D1D1D" size="lg" />

        <div className="">
          <form className="booking_form_container" onSubmit={handleSubmit}>
            <div className="booking_input_container">
              <Dropdown
                id="Provider Service"
                label="Select a Service"
                error={reviewForm.formErrors.service_type_id}
                options={convertProviderServiceTypeToDropdown(
                  pet_provider_services
                )}
                dropdownProps={{
                  onChange: (val: { value: string; label: string }) => {
                    return handleChangeReviewForm("service_type_id", val.value);
                  },

                  required: true,
                }}
              />
              <div className="review_modal_star_container">
                <label className="star_label">
                  Ratings
                  <span className="input_required_asterisk">*</span>
                </label>
                <Stack spacing={1}>
                  <Rating
                    onChange={(event, newValue) => {
                      handleChangeReviewForm("rating", newValue);
                    }}
                    value={reviewForm.form.rating}
                    name="half-rating-read"
                    style={{ fontSize: 40 }}
                    precision={0.5}
                  />
                </Stack>
              </div>
            </div>
            <TextArea
              id="comment"
              label="Comment"
              error={reviewForm.formErrors.comment}
              inputClassName="pet_provider_service_description_input"
              textareaProps={{
                placeholder: "Enter your Comment",
                value: reviewForm.form.comment,
                onChange: (e) => {
                  return handleChangeReviewForm("comment", e.target.value);
                },
                name: "comment",
                required: true,
              }}
            />
            <AuthError error={reviewApiRequest.error?.message} />

            <Button
              label={"Review Pet Care Provider"}
              variant="primary"
              loading={reviewApiRequest.loading}
            />


          </form>
        </div>
      </div>
    </PopModal>
  );
};

export default CreateReviewModal;
