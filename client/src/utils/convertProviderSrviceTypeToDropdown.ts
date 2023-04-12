import { ProviderServiceType } from "../interfaces/ProviderServiceTypeInformation";

export const convertProviderServiceTypeToDropdown = (
  serviceType: ProviderServiceType[]
) => {
  const result: { value: string; label: string }[] = [];
  serviceType?.map((service) => {
    result.push({
      value: service.service_type_id!,
      label: service.service_name,
    });
  });
  return result;
};
