import { IFormattedPetProvider } from "../interfaces/ProviderServiceTypeInformation";

export const filterPetProvidersBySearch = (
  petProviders: IFormattedPetProvider[],
  searchKeyword: string
) => {
  if (searchKeyword) {
    const result: IFormattedPetProvider[] = [];

    petProviders.map((provider) => {
      const providerAddress = `${provider.region} ${provider.city} ${provider.street}`;

      if (
        providerAddress
          .toLocaleLowerCase()
          .includes(searchKeyword.toLocaleLowerCase())
      ) {
        result.push(provider);
      }
    });
    return { message: "Successfully Searched", data: result };
  } else {
    return { message: "No Value Searched", data: petProviders };
  }
};

export const filterPetProvidersByServiceType = (
  petProviders: IFormattedPetProvider[],
  service_name: string
) => {
  if (service_name) {
    const result: IFormattedPetProvider[] = [];
    petProviders.map((provider) => {
      provider.provider_service_types.map((serviceType) => {
        if (
          serviceType.service_name.toLocaleLowerCase() ===
          service_name.toLocaleLowerCase()
        ) {
          result.push(provider);
        }
      });
    });

    return { message: "Successfully Searched", data: result };
  } else {
    return { message: "No Value Searched", data: petProviders };
  }
};
