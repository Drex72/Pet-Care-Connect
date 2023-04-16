import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authScreenActions } from "../../redux/AuthScreenImageSlice";
import LoginImage from "../../assets/images/dog-walking.jpg";
import Input from "../../components/Input/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { AllRouteConstants } from "../../routes/routes";
import { useForm } from "../../hooks/useForm";
import { LoginInput, LoginResponse } from "../../interfaces/LoginInput";
import { emailValidator } from "../../validators/emailValidator";
import { AuthHeader } from "../../components/AuthComponents/AuthHeader/AuthHeader";

import "./VerifyEmailStyles.scss";
// Icons

import Button from "../../components/Button/Button";
import useApi from "../../hooks/useApi";
import { UserType } from "../../interfaces/User";
import authService from "../../services/AuthService";
import Logo from "../../components/Logo/Logo";
import AuthError from "../../components/AuthComponents/AuthError/AuthError";
import VerificationFormModal from "../../components/AuthComponents/AuthModals/VerificationNoticeModal";

export interface IForgotPassword {
  email: string;
  status: string;
  user_type: UserType | null;
}

export const ForgotPassword = () => {
  // Add Login Image
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordOTPSent, setPasswordOTPSent] = useState(false);

  useEffect(() => {
    dispatch(authScreenActions.addImage(LoginImage));
  }, []);

  const forgotPasswordForm = useForm<IForgotPassword>(
    { email: "", user_type: null, status: "reset" },
    { email: emailValidator }
  );

  const handleUserTypeChange = (value: UserType) => {
    forgotPasswordForm.onChange("user_type", value);
  };

  const handleEmailChange = (e: any) => {
    forgotPasswordForm.onChange("email", e.target.value);
  };

  // Login Api Request
  const resetPasswordService = (data: IForgotPassword) =>
    authService.forgotPasswordRequest(data);

  const resetPasswordRequest = useApi<LoginResponse, IForgotPassword>(
    resetPasswordService
  );

  // Submit Handler
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    forgotPasswordForm.resetFormErrors();
    resetPasswordRequest.reset();
    const valid = forgotPasswordForm.validate();
    if (valid) {
      try {
        const user = await resetPasswordRequest.request(
          forgotPasswordForm.form
        );
        if (user?.code === 200) {
          setPasswordOTPSent(true);
        }
      } catch (error) {}
    }
  };

  const handleCloseModal = () => {
    setPasswordOTPSent(false);
    setTimeout(() => {
      navigate(AllRouteConstants.auth.resetPassword, {
        state: {
          userType: forgotPasswordForm.form.user_type,
          userEmail: forgotPasswordForm.form.email,
        },
        replace: true,
      });
    }, 1000);
  };

  // Send The Email on App Start

  return (
    <div className="auth_container">
      <VerificationFormModal
        modalToggler={passwordOTPSent}
        onClose={handleCloseModal}
      />
      <div className="login_logo_container">
        <Logo />
      </div>

      <AuthHeader message="Reset Password" />

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <Input
            id="email"
            label="Email Address"
            error={forgotPasswordForm.formErrors.email}
            inputProps={{
              placeholder: "Enter your email address",
              value: forgotPasswordForm.form.email,
              onChange: handleEmailChange,
              name: "email",
              autoFocus: true,
              required: true,
            }}
          />

          <div className="auth_user_type">
            <p className="auth_user_type-label">I am a: </p>
            <div className="auth_login_checkboxes">
              <Input
                id="petownerID"
                label="Pet Owner"
                error={forgotPasswordForm.formErrors.user_type}
                inputProps={{
                  onChange: () => handleUserTypeChange("PET-OWNER"),
                  type: "radio",
                  name: "user_type",
                  required: true,
                }}
              />
              <Input
                id="serviceproviderID"
                label="Pet Care Provider"
                error={forgotPasswordForm.formErrors.user_type}
                inputProps={{
                  onChange: () => handleUserTypeChange("PET-PROVIDER"),
                  type: "radio",
                  name: "user_type",
                  required: true,
                }}
              />
            </div>
          </div>
        </div>

        <AuthError error={resetPasswordRequest.error?.message} />

        <Button
          label="Reset Password"
          loading={resetPasswordRequest.loading}
          variant="primary"
          buttonClassName="login_submit_button"
        />
      </form>
    </div>
  );
};
