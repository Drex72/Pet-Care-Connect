import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { IRootState } from "../../redux/store";
import { AllRouteConstants } from "../../routes/routes";

export interface RequireAuthProps {
  children: ReactElement;
}

export const RequirePetOwner: React.FC<RequireAuthProps> = ({ children }) => {
  const user = useAppSelector((state) => state.userReducer);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.data?.user_type !== "PET-OWNER") {
      navigate(AllRouteConstants.dashboardRoutes.index);
    }
  }, [user]);

  return children;
};
