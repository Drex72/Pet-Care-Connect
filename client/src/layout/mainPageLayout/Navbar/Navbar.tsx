import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Logo from "../../../components/Logo/Logo";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { AllRouteConstants } from "../../../routes/routes";
import "./NavbarStyles.scss";
import Hamburger from "hamburger-react";

const Navbar = ({
  openSideBar,
  sidebarOpened,
}: {
  openSideBar: () => void;
  sidebarOpened: boolean;
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: userData } = useAppSelector((state) => state.userReducer);

  const gotoLoginPage = () => {
    navigate(AllRouteConstants.auth.login);
  };

  const goToDashboard = () => {
    navigate(AllRouteConstants.dashboardRoutes.index);
  };

  const checkIfItemActive = (route: string) => {
    if (pathname === route) {
      return true;
    }
    if (pathname.split("/").includes(route)) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <nav className={`navbar_container animate__animated animate__fadeIn `}>
        <Link to="/" className="navbar_logo_container">
          <Logo />
        </Link>
        <div className="navbar_hamburger_container" onClick={openSideBar}>
          <Hamburger
            toggled={sidebarOpened}
            size={20}
            color="#157cff"
            toggle={openSideBar}
          />
        </div>
        <ul className="navbar_items_container">
          <li className="navbar_item">
            <Link
              to="/"
              className={`${checkIfItemActive("/") ? "active " : ""}`}
            >
              Home
            </Link>
          </li>
          <li className="navbar_item">
            <Link
              to="/find-provider"
              className={`${
                checkIfItemActive("find-provider") ? "active" : ""
              }`}
            >
              Find a service provider
            </Link>
          </li>
          <li className="navbar_item">
            <Link
              to="/about-us"
              className={`${checkIfItemActive("about-us") ? "active" : ""}`}
            >
              About Us
            </Link>
          </li>
          <li className="navbar_item">
            <Link
              to="/contact-us"
              className={`${checkIfItemActive("contact-us") ? "active" : ""}`}
            >
              Contact Us
            </Link>
          </li>
          <li className="navbar_item">
            {!userData ? (
              <Button
                variant="primary"
                label="Login"
                onClick={gotoLoginPage}
                width="150px"
              />
            ) : (
              <Button
                variant="primary"
                label="Go To Dashboard"
                onClick={goToDashboard}
                width="200px"
              />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
