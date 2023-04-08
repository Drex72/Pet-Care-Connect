import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authScreenActions } from "../../redux/AuthScreenImageSlice";
import RegisterPetOwnerImage from "../../assets/images/hifive-with-dog.jpg";
import Input, { Dropdown, TextArea } from "../../components/Input/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { AuthHeader } from "../../components/AuthComponents/AuthHeader/AuthHeader";
import "./RegisterStyles.scss";
// Icons
import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import { useAppSelector } from "../../hooks/useAppSelector";
import { registrationFormActions } from "../../redux/RegistrationFormSlice";
import {
  ICreatePetCareProvider,
  PetProviderServiceInterface,
} from "../../interfaces/ProviderServiceTypeInformation";
import authService from "../../services/AuthService";
import useApi from "../../hooks/useApi";
import { LoginResponse } from "../../interfaces/LoginInput";
import { AllRouteConstants } from "../../routes/routes";
import AuthError from "../../components/AuthComponents/AuthError/AuthError";
import { PetInformationInterface } from "../../interfaces/PetInformationInterface";

export const RegisterPetOwner = () => {
  // Add Login Image
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(authScreenActions.addImage(RegisterPetOwnerImage));
  }, []);

  const location = useLocation();
  let userType: string = location?.state?.userType;
  //   useEffect(() => {
  //     if (!userType) {
  //       navigate(AllRouteConstants.auth.register.index);
  //     }
  //   }, []);

  // SignUp Form
  const {
    petOwnerFields,
    validators,
    baseUserInformation,
    baseAddressInformation,
  } = useAppSelector((state) => state.registrationFormReducer);

  const registrationForm = useForm<PetInformationInterface>(
    { ...petOwnerFields },
    { ...validators.petCareProviderServiceValidation }
  );

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    registrationForm.onChange(
      e.target.name as keyof PetInformationInterface,
      e.target.value
    );
  };

  // Register Pet Care Provider Api Request

  const createPetProviderApiService = (data: ICreatePetCareProvider) =>
    authService.createPetCareProvider(data);

  const createPetProviderApiRequest = useApi<
    LoginResponse,
    ICreatePetCareProvider
  >(createPetProviderApiService);

  // Submit Handler
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(registrationFormActions.setPetOwnerFields(registrationForm.form));
    registrationForm.resetFormErrors();
    createPetProviderApiRequest.reset();
    const valid = registrationForm.validate();

    if (valid) {
      const requestInformation = {
        ...baseAddressInformation,
        ...baseUserInformation,
        ...registrationForm.form,
      };

      //   try {
      //     const user = await createPetProviderApiRequest.request(
      //       requestInformation
      //     );
      //     if (user?.status) {
      //       dispatch(registrationFormActions.resetAllFields());
      //       return navigate(AllRouteConstants.auth.login);
      //     }
      //   } catch (error) {}
    }
  };

  return (
    <div className="auth_container">
      <div className="signup_logo_container">
        <Logo />
      </div>
      {/* <button onClick={() => navigate(-1)}>Go Back</button> */}

      <AuthHeader message="2/2 Let's know more about your Pet" />
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="signup_form_flex_container">
            <Input
              id="Pet Name"
              label="Pet Name"
              error={registrationForm.formErrors.pet_name}
              inputProps={{
                placeholder: "Enter your Pet Name",
                value: registrationForm.form.pet_name,
                onChange: handleInputChange,
                name: "pet_name",
                required: true,
              }}
            />
            <Input
              id="Pet Breed"
              label="Pet Breed"
              error={registrationForm.formErrors.pet_breed}
              inputProps={{
                placeholder: "Enter your Pet Breed e.g Cat, Dog, etc",
                value: registrationForm.form.pet_breed,
                onChange: handleInputChange,
                name: "pet_breed",
                required: true,
              }}
            />
          </div>
          <div className="signup_form_flex_container">
            <Input
              id="Pet Birthday"
              label="Pet Birthday"
              error={registrationForm.formErrors.pet_birthday}
              inputProps={{
                placeholder: "Enter your Pet Birthday",
                value: registrationForm.form.pet_birthday,
                onChange: handleInputChange,
                name: "pet_birthday",
                required: true,
                type: "date",
              }}
            />
            <Dropdown
              id="Pet Gender"
              label="Pet Gender"
              error={registrationForm.formErrors.pet_gender}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              dropdownProps={{
                onChange: (val: { value: string; label: string }) => {
                  registrationForm.onChange("pet_gender", val.value);
                },
                required: true,
              }}
            />
          </div>
          <Input
            id="Pet Name"
            label="Pet Name"
            error={registrationForm.formErrors.pet_name}
            inputProps={{
              placeholder: "Enter your Pet Name",
              value: registrationForm.form.pet_name,
              onChange: handleInputChange,
              name: "pet_name",
              required: true,
            }}
          />
        </div>

        <Button
          label={`Register`}
          loading={createPetProviderApiRequest.loading}
          variant="primary"
          buttonClassName="signup_submit_button"
        />

        <AuthError error={createPetProviderApiRequest.error?.message} />
      </form>
    </div>
  );
};
