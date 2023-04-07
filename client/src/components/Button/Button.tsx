import React from "react";
import Spinner from "../Spinner/Spinner";
import "./ButtonStyles.scss";

interface buttonProps {
  label: string | React.ReactNode;
  variant: "primary" | "secondary";
  disable?: boolean;
  loading?: boolean;
  type?: "button" | "submit";
  width?: string;
  size?: "sm" | "md" | "lg";
  onClick?: VoidFunction;
  buttonClassName?: string;
}

const Button: React.FC<buttonProps> = ({
  disable,
  onClick,
  variant,
  loading,
  label,
  type,
  width,
  size,
  buttonClassName,
}) => {
  const SizeController = () => {
    switch (size) {
      case "sm":
        return { fontSize: "10px", padding: "10px" };
      case "md":
        return { fontSize: "12px", padding: "13px" };
      case "lg":
        return { fontSize: "15px", padding: "16px" };
      default:
        return { fontSize: "15px", padding: "16px" };
    }
  };
  return (
    <button
      type={type || "submit"}
      onClick={onClick}
      disabled={disable || loading}
      style={{
        width: width ?? "100%",
        padding: SizeController().padding,
        fontSize: SizeController().fontSize,
      }}
      className={`button custom-button custom-button-${variant} ${buttonClassName}`}
    >
      <span>
        {label}
        {loading && (
          <>
            <Spinner />
          </>
        )}
      </span>
    </button>
  );
};

export default Button;
