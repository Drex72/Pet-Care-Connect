import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authScreenActions } from "../../redux/AuthScreenImageSlice";
import RegisterPetCareProviderImage from "../../assets/images/woman-petcare.jpg";
import Input, { TextArea } from "../../components/Input/Input";
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
import { UserType } from "../../interfaces/User";

export const RegisterPetCareProvider = () => {
  // Add Login Image
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(authScreenActions.addImage(RegisterPetCareProviderImage));
  }, []);
//   const location = useLocation();
//   let userType: UserType = location?.state?.userType;
//   useEffect(() => {
//     if (!userType) {
//       navigate(AllRouteConstants.auth.register.index);
//     }
//   }, []);

  // SignUp Form
  const {
    petCareProviderFields,
    validators,
    baseUserInformation,
    baseAddressInformation,
  } = useAppSelector((state) => state.registrationFormReducer);

  const registrationForm = useForm<PetProviderServiceInterface>(
    { ...petCareProviderFields },
    { ...validators.petCareProviderServiceValidation }
  );

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    registrationForm.onChange(
      e.target.name as keyof PetProviderServiceInterface,
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
    dispatch(
      registrationFormActions.setPetCareProviderFields(registrationForm.form)
    );
    registrationForm.resetFormErrors();
    createPetProviderApiRequest.reset();
    const valid = registrationForm.validate();

    if (valid) {
      const requestInformation = {
        ...baseAddressInformation,
        ...baseUserInformation,
        ...registrationForm.form,
      };

      try {
        const user = await createPetProviderApiRequest.request(
          requestInformation
        );
        if (user?.status) {
          dispatch(registrationFormActions.resetAllFields());
          return navigate(AllRouteConstants.auth.login);
        }
      } catch (error) {}
    }
  };

  return (
    <div className="auth_container">
      <div className="signup_logo_container">
        <Logo />
      </div>
      {/* <button onClick={() => navigate(-1)}>Go Back</button> */}

      <AuthHeader message="2/2 Let's know more about your Services" />
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="inputs">
          <Input
            id="Service Name"
            label="Service Name"
            error={registrationForm.formErrors.service_name}
            inputProps={{
              placeholder: "Enter your Service Name",
              value: registrationForm.form.service_name,
              onChange: handleInputChange,
              name: "service_name",
              required: true,
            }}
          />
          <TextArea
            id="Service Description"
            label="Service Description"
            error={registrationForm.formErrors.service_description}
            inputClassName="pet_provider_service_description_input"
            textareaProps={{
              placeholder: "Enter your Service Description",
              value: registrationForm.form.service_description,
              onChange: handleInputChange,
              name: "service_description",
            }}
          />
          <Input
            id="Service Price"
            label="Service Price"
            error={registrationForm.formErrors.service_price_per_hour}
            inputProps={{
              placeholder: "Enter your Service Price",
              value: registrationForm.form.service_price_per_hour,
              onChange: handleInputChange,
              name: "service_price_per_hour",
              required: true,
              type: "number",
            }}
          />
        </div>

        <div className="register_submit_button_containers">
          <Button
            label={`Back`}
            type="button"
            variant="secondary"
            buttonClassName="signup_back_button"
            onClick={() => navigate(AllRouteConstants.auth.register.address)}
          />
          <Button
            label={`Register`}
            loading={createPetProviderApiRequest.loading}
            variant="primary"
            buttonClassName="signup_submit_button"
          />
        </div>

        <AuthError error={createPetProviderApiRequest.error?.message} />
      </form>
    </div>
  );
};
