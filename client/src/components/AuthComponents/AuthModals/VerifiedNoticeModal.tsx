import image from "../../../assets/images/femaleAvatar.svg";

import "./AuthModalStyles.scss";
import Button from "../../Button/Button";
import PopModal from "../../../layout/ModelLayout/ModalLayout";
import Header from "../../Header/Header";
const VerifiedNoticeModal = ({
  onClose,
  email,
  modalToggler,
}: {
  onClose: () => void;
  email: string;
  modalToggler: boolean;
}) => {
  return (
    <PopModal onClose={onClose} modalToggler={modalToggler}>
      <div className="auth_modal_container">
        <Header
          message="Email Verification Successful!"
          variant="primary"
          size="lg"
        />
        <div>
          <img src={image} alt="Female Avatar" />
        </div>
        <p className="auth_modal_text">
          <span style={{ color: "#131418" }}>Congratulations! </span>Email{" "}
          {email} verified Successfully!
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

export default VerifiedNoticeModal;
