
import image from "../../../assets/images/femaleAvatar.svg";
import PopModal from "../../../layout/ModelLayout/ModalLayout";
import Button from "../../Button/Button";
import Header from "../../Header/Header";

import "./AuthModalStyles.scss";
const PasswordResetModal = ({
  onClose,
  modalToggler,
}: {
  onClose: () => void;
  modalToggler: boolean;
}) => {
  return (
    <PopModal onClose={onClose} modalToggler={modalToggler}>
      <div className="auth_modal_container">
        <Header
          message="Password Reset Successful!"
          variant="primary"
          size="lg"
        />
        <div>
          <img src={image} alt="Female Avatar" />
        </div>
        <p className="auth_modal_text">
          <span style={{ color: "#131418" }}>Congratulations! </span>
          Your password has been reset successfully.
        </p>
        <Button
          label={"Proceed to Login"}
          variant="primary"
          type="button"
          onClick={onClose}
          width="70%"
        />
      </div>
    </PopModal>
  );
};

export default PasswordResetModal;
