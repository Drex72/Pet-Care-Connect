import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { IFormattedPetProvider } from "../../interfaces/ProviderServiceTypeInformation";
import Avatar from "../../assets/images/image1.svg";
import NoPetProvider from "../../assets/images/No-PetProviders.png";
import petProviderService from "../../services/PetProviderService";
import "./FindPetProviderStyles.scss";
import CreateBookingModal from "../../components/Modals/CreateBookingModal";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AllRouteConstants } from "../../routes/routes";
import { Toaster } from "react-hot-toast";
import Star from "../../assets/images/Star.svg";
import NoBookingCard from "../../components/NoBookings/NoBookingCard";
import { SocialIcon } from "react-social-icons";
import petOwnerService from "../../services/PetOwnerService";
import { formatNumber } from "../../utils/formatRatingNumber";
import { AiFillStar } from "react-icons/ai";
import SingleReview from "../../components/ReviewComponent/SingleReview";
import Button from "../../components/Button/Button";
import CreateReviewModal from "../../components/Modals/CreateReviewModal";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const SinglePetProvider = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: userData } = useAppSelector((state) => state.userReducer);

  const [userInformation, setUserInformation] = useState<{
    data: IFormattedPetProvider;
    loading: boolean;
  }>({
    data: {} as IFormattedPetProvider,
    loading: false,
  });
  const [providerReviews, setProviderReviews] = useState([]);
  const [createBooking, setCreateBooking] = useState(false);
  const [reviewAdding, setReviewAdding] = useState(false);
  const components: any[] = [];

  const {
    first_name,
    last_name,
    user_avatar,
    provider_service_types,
    region,
    street,
    city,
    id: providerId,
  } = userInformation.data;

  const getUserId = () => {
    const { pathname } = location;

    const pathNameArray = pathname.split("/");

    if (pathNameArray.includes("dashboard")) {
      return pathNameArray[3];
    } else {
      return pathNameArray[2];
    }
  };

  const getUserDetails = async () => {
    setUserInformation({ ...userInformation, loading: true });
    try {
      const details = await petProviderService.getUserDetails(getUserId());
      const reviews = await petOwnerService.getAllReviewsForAProvider(
        getUserId()
      );
      setProviderReviews(reviews.data.data?.allReviews);
      setUserInformation({
        ...userInformation,
        loading: false,
        data: details.data.data?.currentPetProvider,
      });
      const numberOfComponents =
        details.data.data?.currentPetProvider?.overall_provider_rating;

      for (let i = 0; i < numberOfComponents; i++) {
        components.push(
          <AiFillStar className="rating_star_icon star_grey" key={i} />
        );
      }
    } catch (error) {
      console.log(error);
      setUserInformation({ ...userInformation, loading: false });
    }
  };

  const handleAddReview = () => {
    if (userData?.id) {
      return setReviewAdding(true);
    } else {
      return navigate(AllRouteConstants.auth.login);
    }
  };

  const handleCloseModal = () => {
    setCreateBooking(false);
  };
  const handleCloseReviewModal = async () => {
    await getUserDetails();
    setReviewAdding(false);
  };

  const handleBookAppointment = () => {
    if (userData) {
      setCreateBooking(true);
    } else {
      navigate(AllRouteConstants.auth.login);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div>
      {userInformation.loading ? (
        <Loader />
      ) : (
        <div className="pet_provider_information animate__animated animate__fadeIn">
          <button
            className="pet_provider_go_back_button"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
          <Toaster position="top-right" reverseOrder={false} />
          <CreateBookingModal
            pet_owner_id={userData?.id}
            pet_provider_id={providerId}
            modalToggler={createBooking}
            onClose={handleCloseModal}
            pet_provider_services={provider_service_types}
          />
          <CreateReviewModal
            pet_owner_id={userData?.id}
            pet_provider_id={providerId}
            modalToggler={reviewAdding}
            onClose={handleCloseReviewModal}
            pet_provider_services={provider_service_types}
          />
          <div className="pet_provider_information_container">
            <div className="pet_provider_information_image_container">
              <div className="image_container">
                <img src={user_avatar ?? Avatar} alt="avatar" loading="lazy" />
              </div>
              <div className="name_content_container">
                <h2>
                  {first_name} {last_name}
                </h2>
              </div>
              <button
                className="book_provider_button"
                onClick={handleBookAppointment}
                disabled={userData?.user_type !== "PET-OWNER"}
              >
                Book Appointment
              </button>
            </div>
            <div className="pet_provider_information_text_container">
              <div className="text_item">
                <h3>About me</h3>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Suscipit dolorem odio necessitatibus, beatae sed esse, dolore
                  consequuntur ipsa pariatur velit eius natus neque maxime,
                  officia quo. Est beatae sint consectetur reprehenderit eius
                  deleniti facilis nesciunt illum in vel, delectus quos
                  distinctio suscipit rem eveniet amet ex veniam repellendus
                  animi consequuntur?
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Suscipit dolorem odio necessitatibus, beatae sed esse, dolore
                  consequuntur ipsa pariatur velit eius natus neque maxime,
                  officia quo. Est beatae sint consectetur reprehenderit eius
                  deleniti facilis nesciunt illum in vel, delectus quos
                  distinctio suscipit rem eveniet amet ex veniam repellendus
                  animi consequuntur?
                </p>
              </div>

              <div className="text_item">
                <h3>Services Offered</h3>
                <ul>
                  {provider_service_types?.map((providerService, index) => {
                    const { service_name, service_price_per_hour } =
                      providerService;
                    return (
                      <li key={index}>
                        {service_name} - ${service_price_per_hour}/hr
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="text_item">
                <h3>Contact Address</h3>
                <ul className="contact_address">
                  <li>{street}</li>
                  <li>{city}</li>
                  <li>{region}</li>
                  <li>United Kingdom</li>
                </ul>
              </div>

              <div className="text_item icon_container">
                <SocialIcon url="https://instagram.com/petCareConnect" />
                <SocialIcon url="https://facebook.com/petCareConnect" />
                <SocialIcon url="https://twitter.com/petCareConnect" />
              </div>

              <div className="social_media_icons"></div>
            </div>
          </div>

          <div className="pet_provider_information_review">
            <h2>Customer Reviews</h2>
            <Button
              variant="primary"
              label="Add Review"
              width="15%"
              onClick={handleAddReview}
            />
          </div>

          <div className="review_container">
            <div className="stars_and_statistics">
              <div className="stars_amount">
                <div className="ratings_amount">
                  <h2>
                    {formatNumber(
                      userInformation.data?.overall_provider_rating ?? 0
                    )}
                  </h2>

                  <div className="star_container">
                    <Stack spacing={1}>
                      <Rating
                        name="half-rating-read"
                        defaultValue={
                          userInformation.data?.overall_provider_rating ?? 0
                        }
                        precision={0.5}
                        readOnly
                      />
                    </Stack>
                  </div>

                  <span>{providerReviews.length} Reviews</span>
                </div>
                <div className="progress_bar_container">
                  <div className="progress_bar">
                    <span>5</span>
                    <div className="bar bar--active"></div>
                  </div>
                  <div className="progress_bar">
                    <span>4</span>
                    <div className="bar"></div>
                  </div>
                  <div className="progress_bar">
                    <span>3</span>
                    <div className="bar"></div>
                  </div>
                  <div className="progress_bar">
                    <span>2</span>
                    <div className="bar"></div>
                  </div>
                  <div className="progress_bar">
                    <span>1</span>
                    <div className="bar"></div>
                  </div>
                </div>
              </div>

              <div className="service_type_stars_amount">
                {userInformation.data.provider_service_types?.map(
                  (service_type, index) => (
                    <div className="service_type_stars_single" key={index}>
                      <p>{service_type.service_name}</p>
                      <div className="stars">
                        <div className="star_container">
                          <Stack spacing={1}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={service_type?.service_rating ?? 0}
                              precision={0.5}
                              readOnly
                            />
                          </Stack>
                        </div>
                        {formatNumber(service_type?.service_rating ?? 0)}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="review_ratings_full_content_container">
              {userInformation.data.reviews?.length == 0 ? (
                <>
                  <NoBookingCard header={'No Reviews Created'} />
                </>
              ) : (
                <>
                  {providerReviews.map((review: any) => (
                    <SingleReview review={review} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePetProvider;
