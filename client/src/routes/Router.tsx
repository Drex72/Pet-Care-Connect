import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scroll from "../components/scrollToTop/ScrollToTop";
import { IRootState } from "../redux/store";
import { AllRouteConstants } from "./routes";
import { LandingPage, Login, Register, RegisterAddress, RegisterPetCareProvider, RegisterPetOwner } from "../pages";
import AuthLayout from "../layout/authLayout/AuthLayout";
import HomeLayout from "../layout/mainPageLayout/HomeLayout";
import { RequirePetOwner } from "../components/HigherOrderComponents/";

function Router() {

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
          <Route
            path={AllRouteConstants.auth.register.index}
            element={<Register />}
          />
          <Route
            path={AllRouteConstants.auth.register.address}
            element={<RegisterAddress />}
          />
          <Route
            path={AllRouteConstants.auth.register.pet__care_provider_register}
            element={<RegisterPetCareProvider />}
          />
          <Route
            path={AllRouteConstants.auth.register.pet_owner_register}
            element={<RegisterPetOwner />}
          />
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
