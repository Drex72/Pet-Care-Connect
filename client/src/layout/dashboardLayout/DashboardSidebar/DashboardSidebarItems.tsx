import React from "react";
import { useLocation } from "react-router-dom";
import "./DashboardSidebarStyles.scss";

interface NavItemProps {
  paths: string[];
  onClick: VoidFunction;
  sidebarIcon: JSX.Element;
  sidebarItemName: string;
}

const DashboardSidebarItem: React.FC<NavItemProps> = ({
  paths,
  sidebarIcon,
  sidebarItemName,
  onClick,
}) => {
  const { pathname } = useLocation();
  let sidebarItemCurrentPath: any = paths[0]?.split("/")[1];

  if (pathname.split("/")[2] == undefined && sidebarItemCurrentPath == "") {
    sidebarItemCurrentPath = undefined;
  }

  return (
    <div
      onClick={onClick}
      className={`dashboard_sidebar_item_container ${
        pathname.split("/")[2] === sidebarItemCurrentPath
          ? "dashboard_sidebar_item_container_active"
          : ""
      }`}
    >
      <div className="dashboard_sidebar_item">{sidebarIcon}</div>
      <span className={`dashboard_sidebar_item_text`}>{sidebarItemName}</span>
    </div>
  );
};

export default DashboardSidebarItem;
