import React from "react";
import "./AuthHeaderStyles.scss";

export const AuthHeader = ({
  message,
  color,
}: {
  message: string;
  color?: string;
}) => {
  return (
    <h2 className="auth_header" style={{ color }}>
      {message}
    </h2>
  );
};
