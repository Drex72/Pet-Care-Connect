import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scroll from "../components/scrollToTop/ScrollToTop";
import { AllRouteConstants } from "./routes";
import {
  Bookings,
  FindPetProvider,
  Login,
  ForgotPassword,
  Pets,
  Register,
  RegisterAddress,
  RegisterPetCareProvider,
  RegisterPetOwner,
  Settings,
  VerifyEmail,
  ResetPassword,
  PetCareProviderServices,
  DashboardHome,
} from "../pages";
import AuthLayout from "../layout/authLayout/AuthLayout";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import {
  RequirePetOwner,
  RequirePetProvider,
} from "../components/HigherOrderComponents";
import HomeLayout from "../layout/mainPageLayout/HomeLayout";
import { AboutUs, ContactUs, HomePage } from "../pages/LandingPages";
import SinglePetProvider from "../pages/FindPetProvider/SinglePetProvider";

function Router() {
  return (
    <BrowserRouter>
      <Scroll />
      <Routes>
        {/* These are the routes for my landing Page, home, about us, etc */}
        <Route
          path={AllRouteConstants.landingRoute.index}
          element={<HomeLayout />}
        >
          <Route index element={<HomePage />} />
          <Route
            path={AllRouteConstants.landingRoute.contactUs}
            element={<ContactUs />}
          />
          <Route
            path={AllRouteConstants.landingRoute.aboutUs}
            element={<AboutUs />}
          />
          <Route
            path={AllRouteConstants.landingRoute.findPetProvider}
            element={
              <div style={{ width: "90%", margin: "0 auto" }}>
                <FindPetProvider />
              </div>
            }
          />
          <Route
            path={AllRouteConstants.landingRoute.findSinglePetProvider}
            element={
              <div style={{ width: "90%", margin: "0 auto" }}>
                <SinglePetProvider />
              </div>
            }
          />
        </Route>

        {/* These are my Authentication Routes, Login, Logout, etc */}

        {/* There is a layout that wraps all the auth routes */}
        <Route path={AllRouteConstants.auth.index} element={<AuthLayout />}>
          {/* These are the auth routes that are being wrapped with the layout */}
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
          <Route
            path={AllRouteConstants.auth.verifyEmail}
            element={<VerifyEmail />}
          />
          <Route
            path={AllRouteConstants.auth.forgotPassword}
            element={<ForgotPassword />}
          />
          <Route
            path={AllRouteConstants.auth.resetPassword}
            element={<ResetPassword />}
          />
        </Route>

        {/* Dashboard Routes */}
        <Route
          path={AllRouteConstants.dashboardRoutes.index}
          element={<DashboardLayout />}
        >
          <Route
            index
            path={AllRouteConstants.dashboardRoutes.index}
            element={<DashboardHome />}
          />
          <Route
            path={AllRouteConstants.dashboardRoutes.booking}
            element={<Bookings />}
          />

          <Route
            path={AllRouteConstants.dashboardRoutes.settings}
            element={<Settings />}
          />

          {/* Pet Owner Routes */}
          {/* I created a higher order component that checks if the user type is of type pet owner, if it is, then it opens the page, else, it navigates to the home page */}
          <Route
            path={
              AllRouteConstants.dashboardRoutes.pet_owner_routes
                .petCareProviders
            }
            element={
              <RequirePetOwner>
                <FindPetProvider />
              </RequirePetOwner>
            }
          />

          <Route
            path={
              AllRouteConstants.dashboardRoutes.pet_owner_routes
                .petCareProvidersSingle
            }
            element={
              <RequirePetOwner>
                <SinglePetProvider />
              </RequirePetOwner>
            }
          />
          <Route
            path={AllRouteConstants.dashboardRoutes.pet_owner_routes.pets}
            element={
              <RequirePetOwner>
                <Pets />
              </RequirePetOwner>
            }
          />

          {/* Pet Provider Routes */}
          <Route
            path={
              AllRouteConstants.dashboardRoutes.pet_care_provider_routes
                .services
            }
            element={
              <RequirePetProvider>
                <PetCareProviderServices />
              </RequirePetProvider>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
