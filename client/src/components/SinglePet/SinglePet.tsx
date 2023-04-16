import React, { useEffect, useState } from "react";
import "./SinglePetStyles.scss";
import Image from "../../assets/images/cat-and-dogs.svg";
const SinglePet = ({ pet }: { pet: any }) => {
  const [animalImage, setAnimalImage] = useState("");

  return (
    <div className="single_pet_container">
      <div className="single_pet_image">
        <img src={Image} />
      </div>
      <div className="single_pet_content">
        <h2>
          Pet Name: <span>{pet.pet_name}</span>
        </h2>
        <h2>
          Pet Breed: <span>{pet.pet_breed}</span>
        </h2>
        <h2>
          Pet Gender: <span>{pet.pet_gender}</span>
        </h2>
        <h2>
          Pet Birthday:<span>{pet.pet_birthday.slice(0, 10)}</span>
        </h2>
      </div>
    </div>
  );
};

export default SinglePet;
