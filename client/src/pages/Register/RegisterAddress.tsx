import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authScreenActions } from "../../redux/AuthScreenImageSlice";
import RegisterAddressImage from "../../assets/images/map.svg";
import Input from "../../components/Input/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { AllRouteConstants } from "../../routes/routes";
import { useForm } from "../../hooks/useForm";
import { AuthHeader } from "../../components/AuthComponents/AuthHeader/AuthHeader";
import "./RegisterStyles.scss";
// Icons
import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import { AddressInterface } from "../../interfaces/BasicUserInterface";
import { useAppSelector } from "../../hooks/useAppSelector";
import { registrationFormActions } from "../../redux/RegistrationFormSlice";
import PhoneInputField from "../../components/Input/PhoneInput";
import { UserType } from "../../interfaces/User";

export const RegisterAddress = () => {
  // Add Login Image
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(authScreenActions.addImage(RegisterAddressImage));
  }, []);
  const location = useLocation();
  let userType: UserType = location?.state?.userType;
  // useEffect(() => {
  //   if (!userType) {
  //     navigate(AllRouteConstants.auth.register.index);
  //   }
  // }, []);

  // SignUp Form
  const { baseAddressInformation, validators } = useAppSelector(
    (state) => state.registrationFormReducer
  );

  const registrationForm = useForm<AddressInterface>(
    { ...baseAddressInformation },
    { ...validators.baseAddressInformationValidation }
  );

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    registrationForm.onChange(
      e.target.name as keyof AddressInterface,
      e.target.value
    );
  };

  // Submit Handler
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(
      registrationFormActions.setBaseUserAddressFields(registrationForm.form)
    );
    if (userType === "PET-OWNER") {
      return navigate(AllRouteConstants.auth.register.pet_owner_register, {
        state: { userType },
        replace: true,
      });
    }
    if (userType === "PET-PROVIDER") {
      return navigate(
        AllRouteConstants.auth.register.pet__care_provider_register,
        {
          state: { userType },
          replace: true,
        }
      );
    }
  };

  return (
    <div className="auth_container">
      <div className="signup_logo_container">
        <Logo />
      </div>

      <AuthHeader message="1/2 Making it Easy to Reach you" />
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="inputs">
          <PhoneInputField
            id="phoneNumber"
            label="Phone Number"
            error={registrationForm.formErrors.phone_number}
            value={registrationForm.form.phone_number}
            onChange={(value: string) =>
              registrationForm.onChange("phone_number", `+${value}`)
            }
            inputProps={{
              name: "phone_number",
              required: true,
              autoFocus: true,
            }}
          />
          <div className="signup_form_flex_container">
            <Input
              id="Street Name"
              label="Street Name"
              error={registrationForm.formErrors.street}
              inputProps={{
                placeholder: "Enter your Street Name",
                value: registrationForm.form.street,
                onChange: handleInputChange,
                name: "street",
                required: true,
              }}
            />
            <Input
              id="City Name"
              label="City Name"
              error={registrationForm.formErrors.city}
              inputProps={{
                placeholder: "Enter your City Name",
                value: registrationForm.form.city,
                onChange: handleInputChange,
                name: "city",
                required: true,
              }}
            />
          </div>
          <div className="signup_form_flex_container">
            <Input
              id="State"
              label="State"
              error={registrationForm.formErrors.region}
              inputProps={{
                placeholder: "Enter your State",
                value: registrationForm.form.region,
                onChange: handleInputChange,
                name: "region",
                required: true,
              }}
            />
            <Input
              id="Postal Code"
              label="Postal Code"
              error={registrationForm.formErrors.postal_code}
              inputProps={{
                placeholder: "Enter your Postal Code",
                value: registrationForm.form.postal_code,
                onChange: handleInputChange,
                name: "postal_code",
                required: true,
              }}
            />
          </div>
        </div>
        <div className="register_submit_button_containers">
          <Button
            label={`Back`}
            type="button"
            variant="secondary"
            buttonClassName="signup_back_button"
            onClick={() => navigate(AllRouteConstants.auth.register.index)}
          />
          <Button
            label={`Continue`}
            variant="primary"
            buttonClassName="signup_submit_button"
          />
        </div>
      </form>
    </div>
  );
};
