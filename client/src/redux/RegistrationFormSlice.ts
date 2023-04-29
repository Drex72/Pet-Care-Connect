/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import {
  AddressInterface,
  UserInterface,
} from "../interfaces/BasicUserInterface";
import { PetInformationInterface } from "../interfaces/PetInformationInterface";
import { PetProviderServiceInterface } from "../interfaces/ProviderServiceTypeInformation";
import { emailValidator } from "../validators/emailValidator";
import { emptyValidator } from "../validators/emptyValidator";
import { nameValidator } from "../validators/nameVaildator";
import { passwordValidator } from "../validators/passwordValidator";

interface IRegistrationForm {
  petOwnerFields: PetInformationInterface;
  petCareProviderFields: PetProviderServiceInterface;
  baseUserInformation: UserInterface;
  baseAddressInformation: AddressInterface;
  validators: any;
}

interface ISetBaseUser {
  payload: UserInterface;
}
interface ISetBaseAddressUser {
  payload: AddressInterface;
}
interface ISetPetOwner {
  payload: PetInformationInterface;
}
interface ISetPetCareProvider {
  payload: PetProviderServiceInterface;
}
const initialState: IRegistrationForm = {
  petOwnerFields: {
    pet_birthday: "",
    pet_breed: "",
    pet_gender: "male",
    pet_name: "",
    pet_special_needs: "",
  },
  petCareProviderFields: {
    service_name: "",
    service_price_per_hour: "",
    service_description: "",
    business_name: "",
  },
  baseUserInformation: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  },
  baseAddressInformation: {
    region: "",
    postal_code: "",
    street: "",
    city: "",
    phone_number: "",
  },

  validators: {
    baseUserFieldsValidation: {
      first_name: nameValidator,
      last_name: nameValidator,
      email: emailValidator,
      password: passwordValidator,
    },
    baseAddressInformationValidation: {
      phone_number: emptyValidator,
      region: emptyValidator,
      postal_code: emptyValidator,
      street: emptyValidator,
      city: emptyValidator,
    },
    petCareProviderServiceValidation: {
      service_name: emptyValidator,
      service_price_per_hour: emptyValidator,
      service_description: emptyValidator,
    },
  },
};

export const registrationFormSlice = createSlice({
  name: "registrationFormSlice",
  initialState,
  reducers: {
    setBaseUserFields: (state, { payload }: ISetBaseUser) => {
      state.baseUserInformation = payload;
    },
    setBaseUserAddressFields: (state, { payload }: ISetBaseAddressUser) => {
      state.baseAddressInformation = payload;
    },
    setPetOwnerFields: (state, { payload }: ISetPetOwner) => {
      state.petOwnerFields = payload;
    },
    setPetCareProviderFields: (state, { payload }: ISetPetCareProvider) => {
      state.petCareProviderFields = payload;
    },
    resetAllFields: (state) => {
      state.petOwnerFields = {
        pet_birthday: "",
        pet_breed: "",
        pet_gender: "male",
        pet_name: "",
        pet_special_needs: "",
      };
      state.petCareProviderFields = {
        service_name: "",
        service_price_per_hour: "",
        service_description: "",
        business_name: "",
      };
      state.baseUserInformation = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      };
      state.baseAddressInformation = {
        region: "",
        postal_code: "",
        street: "",
        city: "",
        phone_number: "",
      };
    },
  },
});

export const registrationFormActions = registrationFormSlice.actions;

export default registrationFormSlice.reducer;
