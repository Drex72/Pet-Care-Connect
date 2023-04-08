import React, { forwardRef } from "react";
import "./inputStyles.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface InputProps {
  id: string;
  label: string;
  error: string | null;
  inputClassName?: string;
  labelClassName?: string;
  inputProps?: any;
  value: string;
  onChange?: any;
  requiredAstersik?: boolean;
}

type Ref = any;

const PhoneInputField = forwardRef<Ref, InputProps>(
  (
    {
      id,
      value,
      onChange,
      error,
      label,
      inputClassName,
      labelClassName,
      inputProps,
      requiredAstersik,
    },
    ref
  ) => {
    return (
      <div className="custom-input">
        <label htmlFor={id} className={`custom-input__label ${labelClassName}`}>
          {label}{" "}
          {requiredAstersik && inputProps.required && (
            <span className="input_required_asterisk">*</span>
          )}
        </label>

        <div className="custom-input__container">
          <PhoneInput
            country="ng"
            enableSearch={true}
            value={value}
            onChange={onChange}
            inputProps={inputProps}
            inputClass={`${
              error ? "phone_input_error" : "phone_input_normal"
            } ${inputClassName}`}
          />
        </div>

        <span
          className={`custom-input__error ${
            !error ? "custom-input__error-hidden" : undefined
          } animate__animated animate__fadeIn`}
        >{`${id} ${error}`}</span>
      </div>
    );
  }
);

export default PhoneInputField;
