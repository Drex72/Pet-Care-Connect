import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Search from "../../components/Search/Search";
import Map from "../../assets/images/map.svg";
import Avatar from "../../assets/images/image1.svg";

import "./FindPetProviderStyles.scss";
import { MdStar } from "react-icons/md";
import { AiOutlineArrowRight, AiOutlineRight } from "react-icons/ai";
import petProviderService from "../../services/PetProviderService";
import useApi from "../../hooks/useApi";
import { LoginResponse } from "../../interfaces/LoginInput";
import {
  IFormattedPetProvider,
  PetProviderApiResponseInterface,
  PetProviderServiceInterface,
} from "../../interfaces/ProviderServiceTypeInformation";
import {
  filterPetProvidersBySearch,
  filterPetProvidersByServiceType,
} from "../../utils/petProviderSearch";
interface ProviderServiceType extends PetProviderServiceInterface {
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
      setAllProviderServiceTypes(providerServiceTypes!.data);
      setAllPetProviders({
        all: providers.data?.allPetProviders,
        filtered: providers.data?.allPetProviders,
      });
      console.log(providers.data);
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
                <h3>
                  Results around <span>{sortProviderKeys.search}</span>
                </h3>
              )}

              <div className="sortValues">
                <div className="services_container">
                  {allProviderServiceTypes.map((service) => {
                    return (
                      <ServiceElement
                        key={service.id}
                        service={service.service_name}
                      />
                    );
                  })}
                </div>
                hey
              </div>

              <div className="pet_care_provider_list">
                {allPetProviders.all.map((petProvider) => {
                  console.log(petProvider);
                  return (
                    <PetProviderCard petProviderInformation={petProvider} />
                  );
                })}
              </div>
            </div>
            <div className="image_container">
              <img src={Map} alt="map" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const ServiceElement = ({ service }: { service: string }) => {
  return <div className="service_name_container">{service}</div>;
};

export const PetProviderCard = ({
  petProviderInformation,
}: {
  petProviderInformation: IFormattedPetProvider;
}) => {
  return (
    <div className="pet_provider_card">
      <div className="pet_provider_card_container">
        <img src={Avatar} alt="avatar" />
        <div className="pet_provider_card_right">
          <div className="pet_provider_card_right_top">
            <p>38, John St, AB25 1LL, Aberdeen, Scotland</p>

            <span>3.4km away</span>
          </div>

          <h5>
            {petProviderInformation.first_name}{" "}
            {petProviderInformation.last_name}
          </h5>
          <ul className="pet_provider_card_services">
            <li>Pet Walking</li>
            <li>Dog training</li>
            <li>Pet Sitting</li>
          </ul>

          <div className="pet_provider_card_right_bottom">
            <div className="pet_provider_card_ratings">
              <span>
                <h2>4.6</h2>
                <MdStar className="star" />
              </span>
              <p>28 Reviews</p>
            </div>
            <button>
              View Profile <AiOutlineArrowRight />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
