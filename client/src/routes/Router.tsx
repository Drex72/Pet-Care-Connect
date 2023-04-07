import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scroll from "../components/scrollToTop/ScrollToTop";
import { IRootState } from "../redux/store";
import { AllRouteConstants } from "./routes";
import { LandingPage, Login } from "../pages";
import AuthLayout from "../layout/authLayout/AuthLayout";
import HomeLayout from "../layout/mainPageLayout/HomeLayout";
import { RequirePetOwner } from "../components/HigherOrderComponents/";

function Router() {
  const user = useSelector((state: IRootState) => state.userReducer);

  return (
    <BrowserRouter>
      <Scroll />
      <Routes>
        {/* Landing Page */}
        <Route
          path={AllRouteConstants.landingRoute}
          element={<LandingPage />}
        />

        {/* Authentication Routes */}
        <Route path={AllRouteConstants.auth.index} element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path={AllRouteConstants.auth.login} element={<Login />} />
        </Route>

        {/** Pet Owner Routes */}
        <Route
          path={AllRouteConstants.pet_owner_routes.home}
          element={
            <RequirePetOwner>
              <HomeLayout />
            </RequirePetOwner>
          }
        ></Route>

        {/* Pet Provider Routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
