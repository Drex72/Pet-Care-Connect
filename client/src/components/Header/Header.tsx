import React from "react";
import "./Header.scss";
const Header = ({
  message,
  variant,
  color,
  size,
}: {
  message: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}) => {
  const fontSize = () => {
    switch (size) {
      case "sm":
        return "15px";
      case "md":
        return "20px";
      case "lg":
        return "30px";
      case "xl":
        return "40px";

      default:
        return "2rem";
    }
  };
  const colorCode = () => {
    switch (variant) {
      case "primary":
        return "#157cff";
    }
  };
  return (
    <h2
      style={{
        color: color ?? colorCode(),
        fontSize: fontSize(),
        fontWeight: "bold",
      }}
    >
      {message}
    </h2>
  );
};

export default Header;
