import React from "react";
import "./NoBookingStyles.scss";
import NoAppointment from "../../assets/images/No-Bookings.png";
import Header from "../Header/Header";

const NoBookingCard = ({
  header = null,
  message,
}: {
  header?: string | null;
  message?: string | null;
}) => {
  return (
    <div className="no_appointment_container">
      <div className="no_appointment_image_container">
        <img
          src={NoAppointment}
          alt="No Appointments"
          className="no_appointment_image"
        />
      </div>
      <Header message={header ?? "Your Bookings List is Empty"} size="md" />
      {message && <span>{message}</span>}
    </div>
  );
};

export default NoBookingCard;
