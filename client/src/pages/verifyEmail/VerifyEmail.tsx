import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authScreenActions } from "../../redux/AuthScreenImageSlice";
import LoginImage from "../../assets/images/dog-walking.jpg";
import Input from "../../components/Input/Input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AllRouteConstants } from "../../routes/routes";
import { useForm } from "../../hooks/useForm";
import { LoginInput, LoginResponse } from "../../interfaces/LoginInput";
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
import { UserType } from "../../interfaces/User";
import authService from "../../services/AuthService";
import Logo from "../../components/Logo/Logo";
import AuthError from "../../components/AuthComponents/AuthError/AuthError";
import OtpInput from "../../components/OtpInput/OtpInput";
import {
  IConfirmOTP,
  ISendVerification,
} from "../../interfaces/VerifyEmailInterface";

export const VerifyEmail = () => {
  // Add Login Image
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(authScreenActions.addImage(LoginImage));
  }, []);

  const [otp, setOtp] = useState("");
  const [disable, setDisable] = useState(true);
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState<number>(0);

  const onChange = (value: string) => setOtp(value.trim());

  let userEmail = location?.state?.userEmail;
  let userType = location?.state?.userType;

  // Login Api Request

  const verificationemail = (data: ISendVerification) =>
    authService.sendVerificationMail(data);

  const comfirmemailService = (data: IConfirmOTP) =>
    authService.confirmVerificationCode(data);

  const verificationemailApiRequest = useApi<LoginResponse, ISendVerification>(
    verificationemail
  );

  const confirmOTPApiRequest = useApi<LoginResponse, IConfirmOTP>(
    comfirmemailService
  );

  const sendMail = async () => {
    if (disable) return;

    const result = await verificationemailApiRequest.request({
      email: userEmail,
      user_type: userType,
    });

    if (result) {
      setSeconds(59);
      setMinutes(1);
      setDisable(true);
    }
  };

  // Submit Handler
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const result = await confirmOTPApiRequest.request({
      email: userEmail,
      user_type: userType,
      otp,
    });
    if (result?.status ) {
      return navigate(AllRouteConstants.dashboardRoutes.index);
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

  // Send The Email on App Start

  useEffect(() => {
    if (!userEmail && !userType) {
      return navigate(AllRouteConstants.auth.login);
    }
  }, []);

  return (
    <div className="auth_container">
      <div className="login_logo_container">
        <Logo />
      </div>

      <AuthHeader message="Verify Account" />

      <p className="forgot_password_text">
        A 6 Digit verification code was sent to your email {userEmail}, Kindly
        input the code below to verify your Pet Care Account
      </p>

      <form onSubmit={handleSubmit}>
        <OtpInput value={otp} valueLength={6} onChange={onChange} />

        <AnimateHeight duration={300} height={minutes < 0 ? 0 : "auto"}>
          <p className="auth_text_2">
            Resend code in{" "}
            <span style={{ color: "#F6374E" }}>{`${minutes}:${seconds}`}</span>
          </p>
        </AnimateHeight>

        <AuthError error={confirmOTPApiRequest.error?.message} />

        <Button
          label="Verify"
          disable={otp.length !== 6}
          loading={confirmOTPApiRequest.loading}
          variant="primary"
        />


        <Button
          label={"Resend"}
          loading={verificationemailApiRequest.loading}
          disable={disable}
          variant="secondary"
          type="button"
          onClick={sendMail}
        />
      </form>
    </div>
  );
};
