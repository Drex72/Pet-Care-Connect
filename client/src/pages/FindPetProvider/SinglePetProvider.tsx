import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { IFormattedPetProvider } from "../../interfaces/ProviderServiceTypeInformation";
import Avatar from "../../assets/images/image1.svg";
import petProviderService from "../../services/PetProviderService";
import "./FindPetProviderStyles.scss";
import CreateBookingModal from "../../components/Modals/CreateBookingModal";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AllRouteConstants } from "../../routes/routes";
import { Toaster } from "react-hot-toast";
import Button from "../../components/Button/Button";

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
  const [createBooking, setCreateBooking] = useState(false);

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
      const details = await (
        await petProviderService.getUserDetails(getUserId())
      ).data?.data;

      setUserInformation({
        ...userInformation,
        loading: false,
        data: details?.currentPetProvider,
      });
    } catch (error) {
      console.log(error);
      setUserInformation({ ...userInformation, loading: false });
    }
  };
  const handleCloseModal = () => {
    setCreateBooking(false);
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

              <div className="social_media_icons"></div>
            </div>
          </div>

          <div className="pet_provider_information_review">
            <h2>Customer Reviews</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePetProvider;
