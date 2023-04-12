import React, { forwardRef } from "react";
import "./inputStyles.scss";
import Select from "react-select";

interface InputProps {
  id: string;
  label: string;
  error: string | null;
  inputClassName?: string;
  labelClassName?: string;
  rightIcon?: JSX.Element;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  requiredAstersik?: boolean;
}

type Ref = any;

const Input = forwardRef<Ref, InputProps>(
  (
    {
      id,
      inputProps,
      error,
      label,
      rightIcon,
      inputClassName,
      requiredAstersik,
      labelClassName,
    },
    ref
  ) => {
    return (
      <div className="custom-input">
        <label htmlFor={id} className={`custom-input__label ${labelClassName}`}>
          {label}{" "}
          {inputProps?.required && (
            <span className="input_required_asterisk">*</span>
          )}
        </label>

        <div className="custom-input__container">
          <input
            ref={ref}
            {...inputProps}
            id={id}
            className={`custom-input__container__input ${inputClassName} ${
              error ? "custom-input__container__input-errored" : undefined
            }`}
          />

          {rightIcon && <div className="right-icon">{rightIcon}</div>}
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

interface TextAreaProps {
  id: string;
  label: string;
  error: string | null;
  inputClassName?: string;
  labelClassName?: string;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  rows?: number;
  requiredAstersik?: boolean;
}
export const TextArea = ({
  id,
  textareaProps,
  error,
  label,
  inputClassName,
  rows,
  requiredAstersik,
  labelClassName,
}: TextAreaProps) => {
  return (
    <div className="custom-input">
      <label htmlFor={id} className={`custom-input__label ${labelClassName}`}>
        {label}{" "}
        {requiredAstersik && textareaProps?.required && (
          <span className="input_required_asterisk">*</span>
        )}{" "}
      </label>

      <div className="custom-input__container">
        <textarea
          id={id}
          {...textareaProps}
          rows={rows ?? 10}
          className={`custom-input__container__input ${inputClassName} ${
            error ? "custom-input__container__input-errored" : undefined
          }`}
        />
      </div>

      <span
        className={`custom-input__error ${
          !error ? "custom-input__error-hidden" : undefined
        } animate__animated animate__fadeIn`}
      >{`${id} ${error}`}</span>
    </div>
  );
};

interface DropdownProps {
  options: { value: string; label: string }[];
  disabled?: boolean;
  loading?: boolean;
  id: string;
  label: string;
  error: string | null;
  dropdownClassName?: string;
  labelClassName?: string;
  dropdownProps?: any;
}

export const Dropdown = (props: DropdownProps) => {
  const {
    options,
    disabled,
    loading,
    label,
    labelClassName,
    id,
    error,
    dropdownProps,
    dropdownClassName,
  } = props;
  return (
    <div className="custom-input">
      <label htmlFor={id} className={`custom-input__label ${labelClassName}`}>
        {label}{" "}
        {dropdownProps?.required && (
          <span className="input_required_asterisk">*</span>
        )}
      </label>
      <Select
        className={dropdownClassName}
        classNamePrefix="select"
        isDisabled={disabled}
        isLoading={loading}
        options={options}
        required={dropdownProps?.required}
        {...dropdownProps}
      />
      <span
        className={`custom-input__error ${
          !error ? "custom-input__error-hidden" : undefined
        } animate__animated animate__fadeIn`}
      >{`${id} ${error}`}</span>
    </div>
  );
};

export default Input;
