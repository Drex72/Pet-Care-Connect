import { Outlet } from "react-router-dom";
import DashboardNavigation from "../DashboardNavigation/DashboardNavigation";
import "../DashboardLayoutStyles.scss";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useRef } from "react";
import { toggleSideBar } from "../../../redux/sidebarSlice";
import DashboardNavigationDesktop from "../DashboardNavigation/DashboardNavigationDesktop";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import { CSSTransition } from "react-transition-group";


const DashboardMobile = () => {
  const dispatch = useDispatch();
  const { sidebarOpened } = useAppSelector((state) => state.sidebarReducer);

  const handleOpenSide = () => {
    dispatch(toggleSideBar(!sidebarOpened));
  };

  const sidebarContainerRef = useRef(null);
  const sidebarContentRef = useRef(null);
  return (
    <>
      {/* <div className="dashboard_layout_mobile">
      <DashboardNavigation />
      <div className="dashboard_layout_outlet_container">
        <Outlet />
      </div>
    </div> */}
      <div className="av-dashboard-layout-mobile">
        <CSSTransition
          nodeRef={sidebarContainerRef}
          in={sidebarOpened}
          classNames="av-dashboard-layout-mobile__sidebar-container"
          unmountOnExit
          timeout={500}
        >
          <div
            ref={sidebarContainerRef}
            className={`av-dashboard-layout-mobile__sidebar-container`}
            onClick={handleOpenSide}
          >
            <div
              ref={sidebarContentRef}
              className={`av-dashboard-layout-mobile__sidebar-content ${
                sidebarOpened ? "slide-in" : "slide-out"
              } `}
            >
              <DashboardSidebar />
            </div>
          </div>
        </CSSTransition>
        <div className="navigation">

        <DashboardNavigation />
        </div>


        <div className="av-page-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardMobile;
