import React, { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import { CSSTransition } from "react-transition-group";
import Sidebar from "./Sidebar/Sidebar";
import './HomeLayoutStyles.scss'

const HomeLayout = () => {
  const sidebarContainerRef = useRef(null);
  const sidebarContentRef = useRef(null);
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const handleOpenSide = () => {
    setSidebarOpened(!sidebarOpened);
  };
  return (
    <div>
      <CSSTransition
        nodeRef={sidebarContainerRef}
        in={sidebarOpened}
        classNames="home-layout-mobile__sidebar-container"
        unmountOnExit
        timeout={500}
      >
        <div
          ref={sidebarContainerRef}
          className={`home-layout-mobile__sidebar-container`}
          onClick={handleOpenSide}
        >
          <div
            ref={sidebarContentRef}
            className={`home-layout-mobile__sidebar-content ${
              sidebarOpened ? "slide-in" : "slide-out"
            } `}
          >
            <Sidebar />
          </div>
        </div>
      </CSSTransition>
      <Navbar openSideBar={handleOpenSide} sidebarOpened={sidebarOpened} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
