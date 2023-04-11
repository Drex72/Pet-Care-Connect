import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "./DashboardNavigationStyles.scss";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Logo from "../../../components/Logo/Logo";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../../../redux/sidebarSlice";

const DashboardNavigation = () => {
  const dispatch = useDispatch();
  const { sidebarOpened } = useAppSelector((state) => state.sidebarReducer);

  const handleOpenSide = () => {
    dispatch(toggleSideBar(!sidebarOpened));
  };

  return (
    <div className="dashboard_navigation_container">
      <div className="dashboard_navigation_logo">
        <Logo />
      </div>
      <div
        className="dashboard_navigation_hamburger_container"
        onClick={handleOpenSide}
      >
        <RxHamburgerMenu className="dashboard_navigation_hamburger" />
      </div>
    </div>
  );
};

export default DashboardNavigation;
