import React, { useState } from "react";
import { AuthHeader } from "../../components/AuthComponents/AuthHeader/AuthHeader";
import Button from "../../components/Button/Button";

export const PetCareProviderServices = () => {
  const [createService, setCreateService] = useState(false);

  const handleModalOpen = () => {
    setCreateService(true);
  };

  const handleModalClose = () => {
    setCreateService(false);
  };
  return (
    <div className="animate__animated animate__fadeIn">
      {/* <CreatePetModal modalToggler={createPet} onClose={handleModalClose} /> */}
      <div className="pet_container_heading">
        <AuthHeader message="Pet Care Provider Service Types" color="#157cff" />
        <Button
          variant="primary"
          label="Add Service"
          onClick={handleModalOpen}
        />
      </div>
      <div className="pets_container">
        {/* {allPets?.map((pet: any) => (
          <SinglePet pet={pet} />
        ))} */}
      </div>
    </div>
  );
};
