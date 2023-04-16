// Package Imports
import { useState } from "react";
import { HiOutlineShare } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import Cards, { Focused } from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

// Drawer Styles
import "./DrawerStyles.scss";
import PopDrawer from "../../layout/DrawerLayout/DrawerLayout";
import Input from "../Input/Input";
import { useForm } from "../../hooks/useForm";
import { emptyValidator } from "../../validators/emptyValidator";
import { cardNumberValidator } from "../../validators/cardNumberValidator";
import Button from "../Button/Button";
import {
  BookingStatus,
  IFormattedBooking,
} from "../../interfaces/BookingInterface";

interface PayForBookingInterface {
  onClose: () => void;
  drawerToggler: boolean;
  bookingItem: IFormattedBooking;
  bookingPaying: boolean;
  payForBooking: (id: string, status: BookingStatus) => void;
}

interface PaymentFormInterface {
  number: string;
  name: string;
  date: string;
  cvc: string;
}
const PayForBookingDrawer = (props: PayForBookingInterface) => {
  const { onClose, drawerToggler, bookingItem, bookingPaying, payForBooking } =
    props;

  const paymentForm = useForm<PaymentFormInterface>(
    { number: "", name: "", date: "", cvc: "" },
    {
      number: emptyValidator,
      name: emptyValidator,
      date: emptyValidator,
      cvc: emptyValidator,
    }
  );

  const [focus, setFocus] = useState("" as Focused);
  const { name, number, date, cvc } = paymentForm.form;

  const onDrawerClose = () => {
    onClose();
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    paymentForm.onChange(
      e.target.name as keyof PaymentFormInterface,
      e.target.value
    );
  };

  const handlePayForBooking: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    paymentForm.resetFormErrors();
    const valid = paymentForm.validate();

    if (valid) {
      try {
        await payForBooking(bookingItem.id, "CONFIRMED");
        onClose();
      } catch (error) {}
    }
  };
  return (
    <PopDrawer onClose={onDrawerClose} drawerToggler={drawerToggler}>
      <div className="pay_for_booking_drawer">
        <div className="pay_for_booking_drawer_container">
          {/* This is the Share and Cancel Button Container */}
          <div className="pay_for_booking_drawer_head">
            <div className="pay_for_booking_drawer_head_container">
              <AiOutlineClose
                className="pay_for_booking_drawer_head_icon"
                onClick={onDrawerClose}
              />
            </div>
          </div>

          <div className="pay_for_booking_drawer_body">
            <div className="pay_for_booking_drawer_body_card_container card_bg_handler">
              <Cards
                number={number}
                name={name}
                expiry={date}
                cvc={cvc}
                focused={focus}
              />
            </div>
            <form onSubmit={handlePayForBooking}>
              <Input
                id="Card Number"
                label="Card Number"
                error={paymentForm.formErrors.number}
                inputProps={{
                  placeholder: "Enter your Card Number",
                  value: paymentForm.form.number,
                  onChange: handleInputChange,
                  name: "number",
                  type: "number",
                  autoFocus: true,
                  required: true,
                  minLength: 10,
                  min: 10,
                  onFocus: (e) => setFocus(e.target.name as Focused),
                }}
              />
              <Input
                id="Card Name"
                label="Card Name"
                error={paymentForm.formErrors.name}
                inputProps={{
                  placeholder: "Enter your Card Name",
                  value: paymentForm.form.name,
                  onChange: handleInputChange,
                  name: "name",
                  required: true,
                  onFocus: (e) => setFocus(e.target.name as Focused),
                }}
              />
              <Input
                id="Expiry Date"
                label="Expiry Date"
                error={paymentForm.formErrors.date}
                inputProps={{
                  value: paymentForm.form.date,
                  onChange: handleInputChange,
                  name: "date",
                  type: "text",
                  // pattern: "d{2}/d{2}",
                  placeholder: "MM/YY",
                  required: true,
                  onFocus: (e) => setFocus(e.target.name as Focused),
                }}
              />
              <Input
                id="CVC"
                label="CVC"
                error={paymentForm.formErrors.cvc}
                inputProps={{
                  placeholder: "Enter your CVC",
                  value: paymentForm.form.cvc,
                  onChange: handleInputChange,
                  name: "cvc",
                  type: "number",
                  required: true,
                  onFocus: (e) => setFocus(e.target.name as Focused),
                }}
              />
              <div className="booking_information_to_be_paid">
                <h4>Price: ${bookingItem.serviceCharge}</h4>
              </div>
              <Button
                loading={bookingPaying}
                variant="primary"
                label="Pay for Booking"
              />
            </form>
          </div>
        </div>
      </div>
    </PopDrawer>
  );
};

export default PayForBookingDrawer;
