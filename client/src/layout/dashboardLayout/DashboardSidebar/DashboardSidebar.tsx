import { useNavigate } from "react-router-dom";
import DashboardSidebarItem from "./DashboardSidebarItems";
import { ReactComponent as Home } from "../../../assets/icons/HomeInActive.svg";
import { ReactComponent as Logout } from "../../../assets/icons/Logout.svg";

import "./DashboardSidebarStyles.scss";
import useApi from "../../../hooks/useApi";
import Loader from "../../../components/Loader/Loader";
import authService from "../../../services/AuthService";
import { LoginResponse } from "../../../interfaces/LoginInput";
import { AllRouteConstants } from "../../../routes/routes";
import { useDispatch } from "react-redux";
import { userActions } from "../../../redux/UserSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  AiOutlineHome,
  AiOutlineBook,
  AiOutlineSetting,
  AiOutlineTool,
} from "react-icons/ai";
import { BsPersonGear } from "react-icons/bs";
import { MdOutlinePets } from "react-icons/md";
import { getRouteToBeUsed } from "../../../utils/getRouteToBeUsed";
import { UserType } from "../../../interfaces/User";
import Logo from "../../../components/Logo/Logo";
const DashboardSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutApi = () => authService.logout();
  const logoutApiRequest = useApi<string, LoginResponse>(logoutApi);
  const { data } = useAppSelector((store) => store.userReducer);

  const handleLogout = async () => {
    logoutApiRequest.reset();
    try {
      await logoutApiRequest.request();
      dispatch(userActions.logout());
      navigate(AllRouteConstants.auth.index);
    } catch (error) {}
  };

  const goToPage = (page: string) => () => navigate(page);
  return (
    <>
      {logoutApiRequest.loading ? (
        <Loader />
      ) : (
        <div className="dashboard_sidebar_container">
          <div
            onClick={() => navigate(AllRouteConstants.dashboardRoutes.index)}
            className="dashboard_sidebar_logo"
          >
            <Logo />
          </div>

          <div className="dashboard_sidebar_items">
            <DashboardSidebarItem
              paths={['/', AllRouteConstants.dashboardRoutes.index]}
              onClick={goToPage(AllRouteConstants.dashboardRoutes.index)}
              sidebarIcon={<AiOutlineHome />}
              sidebarItemName="Dashboard"
            />

            <DashboardSidebarItem
              paths={[
                "/booking",
                AllRouteConstants.dashboardRoutes.booking,
              ]}
              onClick={goToPage(
                AllRouteConstants.dashboardRoutes.booking
              )}
              sidebarIcon={<AiOutlineBook />}
              sidebarItemName="Bookings"
            />
            {data?.user_type === "PET-OWNER" ? (
              <>
                {/* Pet Owner Dashboard Items */}
                <DashboardSidebarItem
                  paths={["/pet-care-providers", AllRouteConstants.dashboardRoutes.pet_owner_routes.petCareProviders]}
                  onClick={goToPage(AllRouteConstants.dashboardRoutes.pet_owner_routes.petCareProviders)}
                  sidebarIcon={<BsPersonGear />}
                  sidebarItemName="Pet Care Providers"
                />
                <DashboardSidebarItem
                  paths={["/pet-owner-pets", AllRouteConstants.dashboardRoutes.pet_owner_routes.pets]}
                  onClick={goToPage(AllRouteConstants.dashboardRoutes.pet_owner_routes.pets)}
                  sidebarIcon={<MdOutlinePets />}
                  sidebarItemName="Pets"
                />
              </>
            ) : (
              <>
                {/* Pet Care Provider Items */}
                <DashboardSidebarItem
                  paths={["/provider-services", AllRouteConstants.dashboardRoutes.pet_care_provider_routes.services]}
                  onClick={goToPage(AllRouteConstants.dashboardRoutes.pet_care_provider_routes.services)}
                  sidebarIcon={<AiOutlineTool />}
                  sidebarItemName="Services"
                />
              </>
            )}
            <DashboardSidebarItem
              paths={["/settings", AllRouteConstants.dashboardRoutes.settings]}
              onClick={goToPage(AllRouteConstants.dashboardRoutes.settings)}
              sidebarIcon={<AiOutlineSetting />}
              sidebarItemName="Settings"
            />
          </div>

          <div className="dashboard_sidebar_logout" onClick={handleLogout}>
            <Logout />
            <span>Logout</span>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;
