import { ProviderServiceType } from "../pages/FindPetProvider/FindPetProvider";

export function removeDuplicates(
  arr: ProviderServiceType[]
): ProviderServiceType[] {
  const uniqueArr: ProviderServiceType[] = [];
  const seenNames: Set<string> = new Set();
  for (const item of arr) {
    if (!seenNames.has(item.service_name.toLocaleLowerCase())) {
      seenNames.add(item.service_name.toLocaleLowerCase());
      uniqueArr.push(item);
    }
  }
  return uniqueArr;
}
