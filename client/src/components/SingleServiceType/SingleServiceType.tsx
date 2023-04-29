import React, { useEffect, useState } from "react";
import "./SingleServiceTypeStyles.scss";
import Image from "../../assets/images/cat-and-dogs.svg";
import { ProviderServiceType } from "../../interfaces/ProviderServiceTypeInformation";
const SingleServiceType = ({
  serviceType,
}: {
  serviceType: ProviderServiceType;
}) => {
  return (
    <div className="single_pet_container">
      <div className="single_service_image"></div>
      <div className="single_pet_content">
        <h2>
          Service Name: <span>{serviceType.service_name}</span>
        </h2>
        <h2>
          Service Description: <span>{serviceType.service_description}</span>
        </h2>
        <h2>
          Service Rate: <span>{serviceType.service_price_per_hour}</span>
        </h2>
      </div>
    </div>
  );
};

export default SingleServiceType;
