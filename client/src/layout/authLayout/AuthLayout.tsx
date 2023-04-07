import "./AuthLayout.scss";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AllRouteConstants } from "../../routes/routes";
import AuthSectionLeft from "../../components/AuthComponents/AuthSectionLeft/AuthSectionLeft";

const AuthLayout = () => {
  const navigate = useNavigate();

  const { data } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (data?.user_type === "PET-OWNER") {
      navigate(AllRouteConstants.pet_owner_routes.home);
    } else if (data?.user_type === "PET-PROVIDER") {
      navigate(AllRouteConstants.pet_owner_routes.home);
    }
  }, [data]);

  return (
    <div className="auth_layout">
      <AuthSectionLeft />
      <div className="outlet_container">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
