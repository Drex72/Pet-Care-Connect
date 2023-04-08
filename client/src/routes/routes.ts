export const AllRouteConstants = {
  landingRoute: "/",
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
  pet_owner_routes: {
    home: "/",
  },
  pet_care_provider_routes: {
    home: "/",
  },
};

export const RE_DIGIT = new RegExp(/^\d+$/);
