import { UserType } from "../interfaces/User";
import { AllRouteConstants } from "../routes/routes";

export const getRouteToBeUsed = (user_type: UserType): any => {
  if (user_type === "PET-OWNER") {
    return AllRouteConstants.dashboardRoutes.pet_owner_routes;
  } else if (user_type === "PET-PROVIDER") {
    return AllRouteConstants.dashboardRoutes.pet_care_provider_routes;
  }
};
