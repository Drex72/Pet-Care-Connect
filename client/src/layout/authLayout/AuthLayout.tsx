import "./AuthLayout.scss";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AllRouteConstants } from "../../routes/routes";
import AuthSectionLeft from "../../components/AuthComponents/AuthSectionLeft/AuthSectionLeft";

const AuthLayout = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (user.data?.id) {
      navigate(AllRouteConstants.dashboardRoutes.index);
    }
  }, []);

  return (
    <div className="auth_layout">
      <AuthSectionLeft />
      <div className="outlet_container ">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
