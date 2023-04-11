import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import "../DashboardLayoutStyles.scss";
import DashboardNavigation from "../DashboardNavigation/DashboardNavigation";
import DashboardNavigationDesktop from "../DashboardNavigation/DashboardNavigationDesktop";

const DashboardDesktop = () => {
  return (
    <div className="dashboard_layout_desktop">
      <DashboardSidebar />
      <div className="dashboard_layout_desktop_navigation">
        <DashboardNavigationDesktop />
        <div className="dashboard_layout_outlet_container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardDesktop;
