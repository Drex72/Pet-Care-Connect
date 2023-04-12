import image from "../../../assets/images/femaleAvatar.svg";
import PopModal from "../../../layout/ModelLayout/ModalLayout";
import Button from "../../Button/Button";
import Header from "../../Header/Header";

import "./AuthModalStyles.scss";
const VerificationFormModal = ({
  onClose,
  modalToggler,
}: {
  onClose: () => void;
  modalToggler: boolean;
}) => {
  return (
    <PopModal onClose={onClose} modalToggler={modalToggler}>
      <div className="auth_modal_container">
        <Header message="Check Your Email" color="#1D1D1D" size="lg" />
        <div>
          <img src={image} alt="Female Avatar" />
        </div>
        <p className="auth_modal_text">
          A code to verify your account has been sent to your email address.
        </p>
        <Button
          label={"Proceed to OTP Verification"}
          variant="primary"
          type="button"
          onClick={onClose}
          width="70%"
        />
      </div>
    </PopModal>
  );
};

export default VerificationFormModal;
