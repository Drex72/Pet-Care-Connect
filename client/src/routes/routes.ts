export const AllRouteConstants = {
  landingRoute: {
    index: "/",
    aboutUs: "/about-us",
    contactUs: "/contact-us",
    findPetProvider: "/find-provider",
    findSinglePetProvider: "/find-provider/:id",
  },
  auth: {
    index: "/auth",
    login: "/auth/login",
    verifyEmail: "/auth/verify-email",
    register: {
      index: "/auth/register",
      address: "/auth/register/address",
      pet_owner_register: "/auth/register/pet-owner",
      pet__care_provider_register: "/auth/register/pet-care-provider",
    },
  },

  dashboardRoutes: {
    index: "/dashboard",
    settings: "/dashboard/settings",
    booking: "/dashboard/booking",
    pet_owner_routes: {
      petCareProviders: "/dashboard/pet-care-providers",
      petCareProvidersSingle: "/dashboard/pet-care-providers/:id",
      pets: "/dashboard/pet-owner-pets",
    },
    pet_care_provider_routes: {
      services: "/dashboard/provider-services",
    },
  },
};

export const RE_DIGIT = new RegExp(/^\d+$/);
