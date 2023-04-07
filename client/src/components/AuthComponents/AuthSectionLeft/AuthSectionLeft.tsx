import { useAppSelector } from "../../../hooks/useAppSelector";
import "./AuthSectionLeft.scss";

const AuthSectionLeft = () => {
  const { image } = useAppSelector((state) => state.authScreenImageReducer);

  return (
    <div className="auth_section_image_container">
      <img src={image as string} alt="Image" />
    </div>
  );
};

export default AuthSectionLeft;
