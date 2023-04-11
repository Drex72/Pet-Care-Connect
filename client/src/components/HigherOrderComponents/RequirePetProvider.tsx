import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { IRootState } from "../../redux/store";
import { AllRouteConstants } from "../../routes/routes";

export interface RequireAuthProps {
  children: ReactElement;
}

export const RequirePetProvider: React.FC<RequireAuthProps> = ({ children }) => {
  const user = useAppSelector((state) => state.userReducer);
  console.log(user)

  const navigate = useNavigate();

  useEffect(() => {
    if (user.data?.user_type !== "PET-PROVIDER" || !user.data) {
      navigate(AllRouteConstants.auth.login);
    }
  }, [user]);

  return children;
};
