import React from "react";
import NoAppointment from "../../assets/images/No-Bookings.png";

const NoAvailableSlots = () => {
  return (
    <div className="create_appointment_drawer_body_date_information_unavailable_slot">
      <span className="create_appointment_drawer_body_date_information_unavailable_slot_message">
        Slots are not available on this day
      </span>
      <div className="create_appointment_drawer_body_date_information_unavailable_slot_image_container">
        <img
          src={NoAppointment}
          alt="No Appointments"
          className="create_appointment_drawer_body_date_information_unavailable_slot_image"
        />
      </div>
    </div>
  );
};

export default NoAvailableSlots;
