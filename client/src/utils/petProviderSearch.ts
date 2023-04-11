import { IFormattedPetProvider } from "../interfaces/ProviderServiceTypeInformation";

export const filterPetProvidersBySearch = (
  petProviders: IFormattedPetProvider[],
  searchKeyword: string
) => {
  if (searchKeyword) {
    const result: IFormattedPetProvider[] = [];

    petProviders.map((provider) => {
      const providerAddress = `${provider.region} ${provider.city} ${provider.street}`;

      if (providerAddress.includes(searchKeyword)) {
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
  service_id: string
) => {
  if (service_id) {
    const result = petProviders.filter((provider) => {
     return  provider.provider_service_types.id === service_id;
    });

    return { message: "Successfully Searched", data: result };
  } else {
    return { message: "No Value Searched", data: petProviders };
  }
};
