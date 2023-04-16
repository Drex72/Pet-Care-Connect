import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authScreenActions } from "../../redux/AuthScreenImageSlice";
import LoginImage from "../../assets/images/dog-walking.jpg";
import Input from "../../components/Input/Input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AllRouteConstants } from "../../routes/routes";
import { useForm } from "../../hooks/useForm";
import {
  LoginInput,
  LoginResponse,
  ResetPasswordInterface,
} from "../../interfaces/LoginInput";
import { emptyValidator } from "../../validators/emptyValidator";
import { emailValidator } from "../../validators/emailValidator";
import { AuthHeader } from "../../components/AuthComponents/AuthHeader/AuthHeader";
import AnimateHeight from "react-animate-height";

import "./VerifyEmailStyles.scss";
// Icons
import visible from "../../assets/icons/visible.svg";
import notvisible from "../../assets/icons/not-visible.svg";
import Button from "../../components/Button/Button";
import useApi from "../../hooks/useApi";
import authService from "../../services/AuthService";
import Logo from "../../components/Logo/Logo";
import AuthError from "../../components/AuthComponents/AuthError/AuthError";
import OtpInput from "../../components/OtpInput/OtpInput";

import { IForgotPassword } from "./ForgotPassword";
import PasswordResetModal from "../../components/AuthComponents/AuthModals/PasswordResetModal";

export const ResetPassword = () => {
  // Add Login Image
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(authScreenActions.addImage(LoginImage));
  }, []);

  const [disable, setDisable] = useState(true);
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState<number>(0);
  const [mailVerified, setMailVerified] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  let userEmail = location?.state?.userEmail;
  let userType = location?.state?.userType;

  const resetPasswordForm = useForm<ResetPasswordInterface>(
    { email: userEmail, password: "", user_type: userType, otp: "" },
    { email: emailValidator, password: emptyValidator, otp: emptyValidator }
  );

  const handleFormChange = (key: keyof ResetPasswordInterface, value: any) => {
    resetPasswordForm.onChange(key, value);
  };

  // Password Changes
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  // Forgot Password Api Request
  const resetPasswordService = (data: IForgotPassword) =>
    authService.forgotPasswordRequest(data);

  const resetPasswordRequest = useApi<LoginResponse, IForgotPassword>(
    resetPasswordService
  );

  // Reset Password Api Request
  const confirmPasswordResetService = (data: ResetPasswordInterface) =>
    authService.resetPassword(data);

  const confirmPasswordResetRequest = useApi<
    LoginResponse,
    ResetPasswordInterface
  >(confirmPasswordResetService);

  // Resend Mail
  const sendMail = async () => {
    if (disable) return;

    const result = await resetPasswordRequest.request({
      email: userEmail,
      user_type: userType,
      status: "reset",
    });

    if (result?.status) {
      setSeconds(59);
      setMinutes(1);
      setDisable(true);
    }
  };

  // Submit Handler
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const result = await confirmPasswordResetRequest.request(
      resetPasswordForm.form
    );
    if (result?.status) {
      return setMailVerified(true);
    }
  };

  useEffect(() => {
    if (minutes < 0) {
      setDisable(false);
    } else {
      if (!disable) setDisable(true);
    }
  }, [seconds]);

  useEffect(() => {
    if (seconds > 0) {
      if (seconds < 10) {
        const interval = setInterval(
          () => setSeconds(parseInt(String(seconds - 1).padStart(2, "0"))),
          1000
        );
        return () => clearInterval(interval);
      } else {
        const interval = setInterval(() => setSeconds(seconds - 1), 1000);
        return () => clearInterval(interval);
      }
    } else {
      setMinutes(minutes - 1);
      setSeconds(59);
    }
  }, [seconds]);

  const handleCloseModal = () => {
    setMailVerified(false);
    setTimeout(() => {
      navigate(AllRouteConstants.auth.login);
    }, 1000);
  };

  // Send The Email on App Start

  useEffect(() => {
    if (!userEmail && !userType) {
      return navigate(AllRouteConstants.auth.login);
    }
  }, []);

  return (
    <div className="auth_container">
      <PasswordResetModal
        modalToggler={mailVerified}
        onClose={handleCloseModal}
      />
      <div className="login_logo_container">
        <Logo />
      </div>

      <AuthHeader message="Verify Account" />

      <p className="forgot_password_text">
        A 6 Digit verification code was sent to your email {userEmail}, Kindly
        input the code below to verify your Pet Care Account
      </p>

      <form onSubmit={handleSubmit}>
        <OtpInput
          value={resetPasswordForm.form.otp}
          valueLength={6}
          onChange={(value: string) => handleFormChange("otp", value.trim())}
        />

        <Input
          id="password"
          label="Password"
          error={resetPasswordForm.formErrors.password}
          rightIcon={
            <div
              style={{ marginLeft: "10px", cursor: "pointer" }}
              onClick={togglePassword}
            >
              {passwordType === "password" ? (
                <img src={visible} style={{ width: "20px" }} />
              ) : (
                <img src={notvisible} style={{ width: "20px" }} />
              )}
            </div>
          }
          inputProps={{
            type: passwordType,
            placeholder: "Enter your password",
            value: resetPasswordForm.form.password,
            onChange: (e) => handleFormChange("password", e.target.value),
            name: "password",
          }}
        />
        <Input
          id="Confirm Password"
          label="Confirm Password"
          error={
            confirmPassword !== resetPasswordForm.form.password
              ? "Passwords don't match"
              : null
          }
          rightIcon={
            <div
              style={{ marginLeft: "10px", cursor: "pointer" }}
              onClick={togglePassword}
            >
              {passwordType === "password" ? (
                <img src={visible} style={{ width: "20px" }} />
              ) : (
                <img src={notvisible} style={{ width: "20px" }} />
              )}
            </div>
          }
          inputProps={{
            type: passwordType,
            placeholder: "Confirm your password",
            value: confirmPassword,
            onChange: (e) => setConfirmPassword(e.target.value),
            name: "password",
          }}
        />

        <AnimateHeight duration={300} height={minutes < 0 ? 0 : "auto"}>
          <p className="auth_text_2">
            Resend code in{" "}
            <span style={{ color: "#F6374E" }}>{`${minutes}:${seconds}`}</span>
          </p>
        </AnimateHeight>

        <AuthError error={confirmPasswordResetRequest.error?.message} />

        <Button
          label="Verify"
          disable={resetPasswordForm.form.otp.length !== 6}
          loading={confirmPasswordResetRequest.loading}
          variant="primary"
        />

        <Button
          label={"Resend"}
          loading={resetPasswordRequest.loading}
          disable={disable}
          variant="secondary"
          type="button"
          onClick={sendMail}
        />
      </form>
    </div>
  );
};
