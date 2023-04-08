export interface PetInformationInterface {
  pet_name: string;
  pet_breed: string;
  pet_birthday: string;
  pet_gender: "male" | "female";
  pet_special_needs?: string;
}
