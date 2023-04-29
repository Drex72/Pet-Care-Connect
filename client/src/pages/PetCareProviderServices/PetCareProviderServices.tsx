import React, { useEffect, useState } from "react";
import { AuthHeader } from "../../components/AuthComponents/AuthHeader/AuthHeader";
import Button from "../../components/Button/Button";
import SingleServiceType from "../../components/SingleServiceType/SingleServiceType";
import petProviderService from "../../services/PetProviderService";
import useApi from "../../hooks/useApi";
import {
  PetProviderApiResponseInterface,
  ProviderServiceType,
} from "../../interfaces/ProviderServiceTypeInformation";
import { useAppSelector } from "../../hooks/useAppSelector";
import Loader from "../../components/Loader/Loader";

export const PetCareProviderServices = () => {
  const [createService, setCreateService] = useState(false);
  const [allPetServices, setAllPetServices] = useState<{
    loading: boolean;
    data: ProviderServiceType[];
  }>({
    data: [],
    loading: false,
  });
  const { data: userData } = useAppSelector((state) => state.userReducer);

  const getPetProviderServiceTypesService = (id: string) =>
    petProviderService.getAllPetProviderServices(id);

  const getPetProvidersServiceTypeRequest = useApi<
    PetProviderApiResponseInterface,
    string
  >(getPetProviderServiceTypesService);

  const getPetProviders = async () => {
    setAllPetServices({ ...allPetServices, loading: true });
    try {
      const providerServiceTypes =
        await getPetProvidersServiceTypeRequest.request(userData?.id);
      setAllPetServices({
        ...allPetServices,
        loading: false,
        data: providerServiceTypes!.data,
      });
    } catch (error) {
      setAllPetServices({ ...allPetServices, loading: false });
    }
  };
  useEffect(() => {
    getPetProviders();
  }, []);

  const handleModalOpen = () => {
    setCreateService(true);
  };

  const handleModalClose = () => {
    setCreateService(false);
  };
  return (
    <div className="animate__animated animate__fadeIn">
      {allPetServices.loading ? (
        <Loader />
      ) : (
        <>
          {/* <CreatePetModal modalToggler={createPet} onClose={handleModalClose} /> */}
          <div className="pet_container_heading">
            <AuthHeader
              message="Pet Care Provider Service Types"
              color="#157cff"
            />
            <Button
              variant="primary"
              label="Add Service"
              onClick={handleModalOpen}
            />
          </div>
          <div className="pets_container">
            {allPetServices.data?.map((pet: any) => (
              <SingleServiceType serviceType={pet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
