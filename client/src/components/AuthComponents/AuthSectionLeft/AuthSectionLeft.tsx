import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import "./AuthSectionLeft.scss";

const AuthSectionLeft = () => {
  const { image } = useAppSelector((state) => state.authScreenImageReducer);

  return (
    <div
      className={`auth_section_image_container animate__animated animate__fadeIn`}
    >
      <img loading="lazy" src={image as string} alt="Image" />
    </div>
  );
};

export default AuthSectionLeft;
