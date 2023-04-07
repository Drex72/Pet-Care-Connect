import bx_error from "../../../assets/icons/bx_error.svg";
import "./AuthErrorStyles.scss";
const AuthError = ({ error }: { error: any }) => {
  return (
    <div
      style={{
        display: error ? "flex" : "none",
        animationDuration: "1000ms",
      }}
      className="animate__animated animate__rubberBand error_container"
    >
      <img src={bx_error} alt="error" />

      <span className="animate-[spin 3s linear infinite] error_message">
        {error}
      </span>
    </div>
  );
};

export default AuthError;
