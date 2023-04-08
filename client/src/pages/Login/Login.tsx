import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authScreenActions } from "../../redux/AuthScreenImageSlice";
import LoginImage from "../../assets/images/dog-walking.jpg";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { AllRouteConstants } from "../../routes/routes";
import { useForm } from "../../hooks/useForm";
import { LoginInput, LoginResponse } from "../../interfaces/LoginInput";
import { emptyValidator } from "../../validators/emptyValidator";
import { emailValidator } from "../../validators/emailValidator";
import { AuthHeader } from "../../components/AuthComponents/AuthHeader/AuthHeader";
import "./LoginStyles.scss";
// Icons
import visible from "../../assets/icons/visible.svg";
import notvisible from "../../assets/icons/not-visible.svg";
import Button from "../../components/Button/Button";
import useApi from "../../hooks/useApi";
import { UserType } from "../../interfaces/User";
import authService from "../../services/AuthService";
import Logo from "../../components/Logo/Logo";
import AuthError from "../../components/AuthComponents/AuthError/AuthError";

export const Login = () => {
  // Add Login Image
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(authScreenActions.addImage(LoginImage));
  }, []);

  // Login Form
  const loginForm = useForm<LoginInput>(
    { email: "", password: "", user_type: null },
    { email: emailValidator, password: emptyValidator }
  );

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    loginForm.onChange(e.target.name as keyof LoginInput, e.target.value);
  };
  const handleUserTypeChange = (value: UserType) => {
    loginForm.onChange("user_type", value);
  };

  // Login Api Request
  const loginApiService = (data: LoginInput) => authService.login(data);

  const loginApiRequest = useApi<LoginResponse, LoginInput>(loginApiService);

  // Password Changes
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  // Submit Handler
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    loginForm.resetFormErrors();
    loginApiRequest.reset();
    const valid = loginForm.validate();
    if (valid) {
      try {
        const user = await loginApiRequest.request(loginForm.form);

        if (user?.code === 200 && loginForm.form.user_type === "PET-OWNER") {
          return navigate(AllRouteConstants.pet_owner_routes.home);
        }

        if (user?.code === 200 && loginForm.form.user_type === "PET-PROVIDER") {
          return navigate(AllRouteConstants.pet_care_provider_routes.home);
        }
      } catch (error) {}
    }
  };

  return (
    <div className="auth_container">
      <div className="login_logo_container">
        <Logo />
      </div>

      <AuthHeader message="Welcome Back" />
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="inputs">
          <Input
            id="email"
            label="Email Address"
            error={loginForm.formErrors.email}
            inputProps={{
              placeholder: "Enter your email address",
              value: loginForm.form.email,
              onChange: handleInputChange,
              name: "email",
              autoFocus: true,
            }}
          />

          <Input
            id="password"
            label="Password"
            error={loginForm.formErrors.password}
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
              value: loginForm.form.password,
              onChange: handleInputChange,
              name: "password",
            }}
          />

          <div className="auth_user_type">
            <p className="auth_user_type-label">I am a: </p>
            <div className="auth_login_checkboxes">
              <Input
                id="petownerID"
                label="Pet Owner"
                error={loginForm.formErrors.user_type}
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
                error={loginForm.formErrors.user_type}
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

        <Button
          label={"Login"}
          loading={loginApiRequest.loading}
          variant="primary"
          buttonClassName="login_submit_button"
        />

        <AuthError error={loginApiRequest.error?.message} />

        <p>
          Getting Started?{" "}
          <Link
            to={
              loginApiRequest.loading
                ? "#"
                : AllRouteConstants.auth.register.index
            }
            className="tiny_link"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};
// woman-with-twodogs.jpg
