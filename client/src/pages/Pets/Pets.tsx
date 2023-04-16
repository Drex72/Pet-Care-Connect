import React, { useState } from "react";
import { AuthHeader } from "../../components/AuthComponents/AuthHeader/AuthHeader";
import Button from "../../components/Button/Button";
import CreatePetModal from "../../components/Modals/CreatePetModal";
import SinglePet from "../../components/SinglePet/SinglePet";
import { useAppSelector } from "../../hooks/useAppSelector";

export const Pets = () => {
  const { data } = useAppSelector((state) => state.userReducer);
  const [allPets, setAllPets] = useState(data?.pets ?? []);
  const [createPet, setCreatePet] = useState(false);

  const handleModalOpen = () => {
    setCreatePet(true);
  };

  const handleModalClose = () => {
    setCreatePet(false);
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <CreatePetModal modalToggler={createPet} onClose={handleModalClose} />
      <div className="pet_container_heading">
        <AuthHeader message="Pets" color="#157cff" />
        <Button variant="primary" label="Add Pet" onClick={handleModalOpen} />
      </div>
      <div className="pets_container">
        {allPets?.map((pet: any) => (
          <SinglePet pet={pet} />
        ))}
      </div>
    </div>
  );
};
