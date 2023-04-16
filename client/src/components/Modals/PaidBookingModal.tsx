import image from "../../assets/images/femaleAvatar.svg";
import PopModal from "../../layout/ModelLayout/ModalLayout";
import Button from "../Button/Button";
import Header from "../Header/Header";
import "./ModalStyles.scss";

const PaidBookingModal = ({
  onClose,
  modalToggler,
}: {
  onClose: () => void;
  modalToggler: boolean;
}) => {
  return (
    <PopModal onClose={onClose} modalToggler={modalToggler}>
      <div className="booking_modal_container">
        <Header message="Payment Successful!" variant="primary" size="lg" />
        <div>
          <img src={image} alt="Female Avatar" />
        </div>
        <p className="auth_modal_text">
          <span style={{ color: "#131418" }}>Congratulations! </span>
          Your Booking has been payed for Successfully.
        </p>
        <Button
          label={"Proceed to Bookings List"}
          variant="primary"
          type="button"
          onClick={onClose}
          width="70%"
        />
      </div>
    </PopModal>
  );
};

export default PaidBookingModal;
