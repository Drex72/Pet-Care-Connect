import { AiOutlineBook, AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { AllRouteConstants } from "../../../routes/routes";
import HomeSidebarItem from "./HomeSidebarItem";

import "./SidebarStyles.scss";
const Sidebar = () => {
  const { data: userData } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const gotoLoginPage = () => {
    navigate(AllRouteConstants.auth.login);
  };

  const goToDashboard = () => {
    navigate(AllRouteConstants.dashboardRoutes.index);
  };
  const goToPage = (page: string) => () => navigate(page);

  return (
    <div className="sidebar_container">
      <div className="sidebar_inner_container">
        <div className="top">
          <div className="dashboard_sidebar_items">
            <HomeSidebarItem
              paths={["/", AllRouteConstants.landingRoute.index]}
              onClick={goToPage(AllRouteConstants.landingRoute.index)}
              sidebarIcon={<AiOutlineHome />}
              sidebarItemName="Home"
            />

            <HomeSidebarItem
              paths={[
                "/find-provider",
                AllRouteConstants.landingRoute.findPetProvider,
              ]}
              onClick={goToPage(AllRouteConstants.landingRoute.findPetProvider)}
              sidebarIcon={<AiOutlineBook />}
              sidebarItemName="Find a service provider"
            />
            <HomeSidebarItem
              paths={["/about-us", AllRouteConstants.landingRoute.aboutUs]}
              onClick={goToPage(AllRouteConstants.landingRoute.aboutUs)}
              sidebarIcon={<AiOutlineBook />}
              sidebarItemName=" About Us"
            />
            <HomeSidebarItem
              paths={["/contact-us", AllRouteConstants.landingRoute.contactUs]}
              onClick={goToPage(AllRouteConstants.landingRoute.contactUs)}
              sidebarIcon={<AiOutlineBook />}
              sidebarItemName="Contact Us"
            />
          </div>
        </div>
        <div className="bottom">
          <li className="navbar_item">
            {!userData ? (
              <Button variant="primary" label="Login" onClick={gotoLoginPage} />
            ) : (
              <Button
                variant="primary"
                label="Go To Dashboard"
                onClick={goToDashboard}
              />
            )}
          </li>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
