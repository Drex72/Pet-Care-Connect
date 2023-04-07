import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../../redux/store";
import { AllRouteConstants } from "../../routes/routes";

export interface RequireAuthProps {
  children: ReactElement;
}

export const RequirePetOwner: React.FC<RequireAuthProps> = ({ children }) => {
  const user = useSelector((state: IRootState) => state.userReducer);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.data?.user_type !== "PET-OWNER" || !user.data) {
      navigate(AllRouteConstants.auth.login);
    }
  }, [user]);

  return children;
};
