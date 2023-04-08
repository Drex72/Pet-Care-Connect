import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authScreenActions } from "../../redux/AuthScreenImageSlice";
import RegisterImage from "../../assets/images/woman-with-twodogs.jpg";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { AllRouteConstants } from "../../routes/routes";
import { useForm } from "../../hooks/useForm";
import { AuthHeader } from "../../components/AuthComponents/AuthHeader/AuthHeader";
import "./RegisterStyles.scss";
// Icons
import visible from "../../assets/icons/visible.svg";
import notvisible from "../../assets/icons/not-visible.svg";
import Button from "../../components/Button/Button";
import { UserType } from "../../interfaces/User";
import Logo from "../../components/Logo/Logo";
import { UserInterface } from "../../interfaces/BasicUserInterface";
import { useAppSelector } from "../../hooks/useAppSelector";
import { registrationFormActions } from "../../redux/RegistrationFormSlice";

export const Register = () => {
  // Add Login Image
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(authScreenActions.addImage(RegisterImage));
  }, []);

  // SignUp Form

  const { baseUserInformation, validators } = useAppSelector(
    (state) => state.registrationFormReducer
  );

  const [userType, setUserType] = useState<UserType | null>(null);
  const registrationForm = useForm<UserInterface>(
    { ...baseUserInformation },
    { ...validators.baseUserFieldsValidation }
  );

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    registrationForm.onChange(
      e.target.name as keyof UserInterface,
      e.target.value
    );
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

  // Submit Handler
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(registrationFormActions.setBaseUserFields(registrationForm.form));
    return navigate(AllRouteConstants.auth.register.address, {
      state: { userType },
      replace: true,
    });
  };

  return (
    <div className="auth_container">
      <div className="signup_logo_container">
        <Logo />
      </div>

      <AuthHeader message="Let's get you started" />
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="auth_user_type">
            <p className="auth_user_type-label">I am a: </p>

            <div className="auth_signup_checkboxes">
              <Input
                id="petownerID"
                label="Pet Owner"
                error={null}
                inputProps={{
                  onChange: () => setUserType("PET-OWNER"),
                  type: "radio",
                  name: "user_type",
                  required: true,
                  autoFocus: true,
                }}
              />
              <Input
                id="serviceproviderID"
                label="Pet Care Provider"
                error={null}
                inputProps={{
                  onChange: () => setUserType("PET-PROVIDER"),
                  type: "radio",
                  name: "user_type",
                  required: true,
                }}
              />
            </div>
          </div>
          <div className="signup_form_flex_container">
            <Input
              id="First Name"
              label="First Name"
              error={registrationForm.formErrors.first_name}
              inputProps={{
                placeholder: "Enter your First Name",
                value: registrationForm.form.first_name,
                onChange: handleInputChange,
                name: "first_name",
                required: true,
              }}
            />
            <Input
              id="Last Name"
              label="Last Name"
              error={registrationForm.formErrors.last_name}
              inputProps={{
                placeholder: "Enter your Last Name",
                value: registrationForm.form.last_name,
                onChange: handleInputChange,
                name: "last_name",
                required: true,
              }}
            />
          </div>
          <Input
            id="email"
            label="Email Address"
            error={registrationForm.formErrors.email}
            inputProps={{
              placeholder: "Enter your email address",
              value: registrationForm.form.email,
              onChange: handleInputChange,
              name: "email",
              required: true,
            }}
          />

          <Input
            id="password"
            label="Password"
            error={registrationForm.formErrors.password}
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
              value: registrationForm.form.password,
              onChange: handleInputChange,
              name: "password",
              required: true,
            }}
          />
        </div>

        <div className="auth_signup_checkboxes auth_signup_checkbox">
          <Input
            id="petownerID"
            label={"Agrees to Terms and Conditions and Privacy Policy"}
            error={null}
            inputProps={{
              type: "checkbox",
              required: true,
            }}
          />
        </div>

        <Button
          label={`Continue`}
          variant="primary"
          buttonClassName="signup_submit_button"
        />

        <p>
          Already Joined?{" "}
          <Link to={AllRouteConstants.auth.login} className="tiny_link">
            Log into your Account
          </Link>
        </p>
      </form>
    </div>
  );
};
