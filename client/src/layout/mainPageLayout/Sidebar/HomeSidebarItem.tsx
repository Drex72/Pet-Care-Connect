import React from "react";
import { useLocation } from "react-router-dom";
import "./SidebarStyles.scss";

interface NavItemProps {
  paths: string[];
  onClick: VoidFunction;
  sidebarIcon: JSX.Element;
  sidebarItemName: string;
}

const HomeSidebarItem: React.FC<NavItemProps> = ({
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
  const checkIfItemActive = (route: string) => {
    if (pathname == "/" && route == undefined) {
      return true;
    }
    if (pathname === route) {
      return true;
    }
    if (pathname.split("/").includes(route)) {
      return true;
    }
    return false;
  };

  return (
    <div
      onClick={onClick}
      className={`home_sidebar_item_container ${
        checkIfItemActive(sidebarItemCurrentPath)
          ? "home_sidebar_item_container_active"
          : ""
      }`}
    >
      <div className="home_sidebar_item">{sidebarIcon}</div>
      <span className={`home_sidebar_item_text`}>{sidebarItemName}</span>
    </div>
  );
};

export default HomeSidebarItem;
