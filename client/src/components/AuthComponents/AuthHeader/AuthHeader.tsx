import React from "react";
import './AuthHeaderStyles.scss'

export const AuthHeader = ({ message }: { message: string }) => {
  return <h2 className="auth_header">{message}</h2>;
};
