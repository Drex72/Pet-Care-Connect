import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import { IFormattedPetProvider } from "../../interfaces/ProviderServiceTypeInformation";
import Avatar from "../../assets/images/image1.svg";
import petProviderService from "../../services/PetProviderService";
import "./FindPetProviderStyles.scss";

const SinglePetProvider = () => {
  const location = useLocation();
  const [userInformation, setUserInformation] = useState<{
    data: IFormattedPetProvider;
    loading: boolean;
  }>({
    data: {} as IFormattedPetProvider,
    loading: false,
  });

  const { first_name, last_name, user_avatar } = userInformation.data;
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

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div>
      {userInformation.loading ? (
        <Loader />
      ) : (
        <div className="pet_provider_information animate__animated animate__fadeIn">
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
              <button className="book_provider_button">Book Appointment</button>
            </div>
            <div className="pet_provider_information_text_container"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePetProvider;
