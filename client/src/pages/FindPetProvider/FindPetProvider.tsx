import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Search from "../../components/Search/Search";
import Map from "../../assets/images/woman-lifts-dog.jpg";
import Avatar from "../../assets/images/image1.svg";
import "./FindPetProviderStyles.scss";
import { MdStar } from "react-icons/md";
import { AiOutlineArrowRight, AiOutlineRight } from "react-icons/ai";
import petProviderService from "../../services/PetProviderService";
import useApi from "../../hooks/useApi";
import {
  IFormattedPetProvider,
  PetProviderApiResponseInterface,
  PetProviderServiceInterface,
} from "../../interfaces/ProviderServiceTypeInformation";
import {
  filterPetProvidersBySearch,
  filterPetProvidersByServiceType,
} from "../../utils/petProviderSearch";
import { useLocation, useNavigate } from "react-router-dom";
import { AllRouteConstants } from "../../routes/routes";
import { removeDuplicates } from "../../utils/removeDuplicatesFromServices";
import { formatNumber } from "../../utils/formatRatingNumber";
export interface ProviderServiceType extends PetProviderServiceInterface {
  id: string;
}
export const FindPetProvider = () => {
  const [allProviderServiceTypes, setAllProviderServiceTypes] = useState<
    ProviderServiceType[]
  >([]);

  const [allPetProviders, setAllPetProviders] = useState({
    all: [] as IFormattedPetProvider[],
    filtered: [] as IFormattedPetProvider[],
  });

  const [sortProviderKeys, setSortProviderKeys] = useState({
    search: "",
    sortByServiceName: "",
  });
  // Get All Providers Api Request
  const getPetProvidersService = () => petProviderService.getAllPetProviders();
  const getPetProviderServiceTypesService = () =>
    petProviderService.getAllPetProviderServices();

  const getPetProvidersRequest = useApi<any, string>(getPetProvidersService);
  const getPetProvidersServiceTypeRequest = useApi<
    PetProviderApiResponseInterface,
    string
  >(getPetProviderServiceTypesService);

  const [servicesLoading, setServicesLoading] = useState(false);

  const getPetProviders = async () => {
    setServicesLoading(true);
    try {
      const providers = await getPetProvidersRequest.request();
      const providerServiceTypes =
        await getPetProvidersServiceTypeRequest.request();
      setServicesLoading(false);
      console.log(providers);
      setAllProviderServiceTypes(providerServiceTypes!.data);
      setAllPetProviders({
        all: providers.data?.allPetProviders,
        filtered: providers.data?.allPetProviders,
      });
    } catch (error) {
      setServicesLoading(false);
    }
  };
  useEffect(() => {
    getPetProviders();
  }, []);

  const handleSearchForPetProvider = (value: string) => {
    setSortProviderKeys({ ...sortProviderKeys, search: value });
  };
  const filterPetProviders = async () => {
    const searchedResult = filterPetProvidersBySearch(
      allPetProviders.all,
      sortProviderKeys.search
    ).data;
    const petProviderServiceTypeFilter = filterPetProvidersByServiceType(
      searchedResult,
      sortProviderKeys.sortByServiceName
    ).data;

    setAllPetProviders({
      ...allPetProviders,
      filtered: petProviderServiceTypeFilter,
    });
  };
  const handleClickServiceTypeBtn = (serviceName: string) => {
    if (
      serviceName.toLocaleLowerCase() ===
      sortProviderKeys.sortByServiceName.toLocaleLowerCase()
    ) {
      setSortProviderKeys({
        ...sortProviderKeys,
        sortByServiceName: "",
      });
    } else {
      setSortProviderKeys({
        ...sortProviderKeys,
        sortByServiceName: serviceName.toLocaleLowerCase(),
      });
    }
  };
  useEffect(() => {
    filterPetProviders();
  }, [sortProviderKeys]);

  return (
    <>
      {servicesLoading ? (
        <Loader />
      ) : (
        <div className="find_pet_provider_container  animate__animated animate__fadeIn">
          <Search
            searchCustomClass="pet_provider_search"
            placeholder="Search By City"
            onChange={handleSearchForPetProvider}
            label="Search For Pet Provider"
          />

          <p className="pet_provider_result_amount">
            {allPetProviders.filtered.length} Results
          </p>
          <div className="pet_provider_search_flex_container">
            <div className="text_information_container">
              {sortProviderKeys.search && (
                <h3 className="animate__animated animate__fadeIn">
                  Results around <span>{sortProviderKeys.search}</span>
                </h3>
              )}

              <div className="sortValues">
                <div className="services_container">
                  {removeDuplicates(allProviderServiceTypes).map((service) => {
                    return (
                      <ServiceElement
                        key={service.id}
                        serviceTypeInformation={service}
                        onClick={handleClickServiceTypeBtn}
                        selected={
                          service.service_name.toLocaleLowerCase() ===
                          sortProviderKeys.sortByServiceName.toLocaleLowerCase()
                        }
                      />
                    );
                  })}
                </div>
              </div>

              <div className="pet_care_provider_list">
                {allPetProviders.filtered.map((petProvider, index) => {
                  return (
                    <PetProviderCard
                      key={index}
                      petProviderInformation={petProvider}
                    />
                  );
                })}
              </div>
            </div>
            <div className="image_container">
              <img loading="lazy" src={Map} alt="map" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const ServiceElement = ({
  serviceTypeInformation,
  onClick,
  selected,
}: {
  serviceTypeInformation: ProviderServiceType;
  onClick: (val: string) => void;
  selected: boolean;
}) => {
  const { service_name, id } = serviceTypeInformation;
  return (
    <div
      className={`service_name_container ${
        selected ? "service_name_selected" : undefined
      }`}
      onClick={() => onClick(service_name)}
    >
      {service_name}
    </div>
  );
};

export const PetProviderCard = ({
  petProviderInformation,
}: {
  petProviderInformation: IFormattedPetProvider;
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;
  const handleButtonClick = () => {
    const id = petProviderInformation.id;
    if (pathname.split("/").includes("dashboard")) {
      navigate(
        `${AllRouteConstants.dashboardRoutes.pet_owner_routes.petCareProviders}/${id}`
      );
    } else {
      navigate(`${AllRouteConstants.landingRoute.findPetProvider}/${id}`);
    }
  };
  return (
    <div className="pet_provider_card">
      <div className="pet_provider_card_container">
        <div className="avatar_container">
          <img
            loading="lazy"
            src={petProviderInformation.user_avatar ?? Avatar}
            alt="avatar"
          />
        </div>
        <div className="pet_provider_card_right">
          <div className="pet_provider_card_right_top">
            <p>
              {petProviderInformation.street}, {petProviderInformation.city},{" "}
              {petProviderInformation.region}
            </p>
          </div>

          <h5>{petProviderInformation.business_name} </h5>
          <ul className="pet_provider_card_services">
            {petProviderInformation.provider_service_types.map(
              (serviceType) => {
                return <li key={serviceType.id}>{serviceType.service_name}</li>;
              }
            )}
          </ul>

          <div className="pet_provider_card_right_bottom">
            <div className="pet_provider_card_ratings">
              <span>
                <h2>
                  {formatNumber(petProviderInformation.overall_provider_rating)}
                </h2>
                <MdStar className="star" />
              </span>
              <p>{petProviderInformation.reviews.length} Reviews</p>
            </div>
            <button onClick={handleButtonClick}>
              View Profile <AiOutlineArrowRight />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
