import image from "../../assets/images/femaleAvatar.svg";
import { useForm } from "../../hooks/useForm";
import PopModal from "../../layout/ModelLayout/ModalLayout";
import Button from "../Button/Button";
import Header from "../Header/Header";
import Input, { Dropdown } from "../Input/Input";
import { BookingRequestInterface } from "../../interfaces/BookingInterface";
import "./ModalStyles.scss";
import { emptyValidator } from "../../validators/emptyValidator";
import { useEffect, useState } from "react";
import { ProviderServiceType } from "../../interfaces/ProviderServiceTypeInformation";
import { convertProviderServiceTypeToDropdown } from "../../utils/convertProviderSrviceTypeToDropdown";
import { calculateTimeDifferenceInHour } from "../../utils/calculateTimeDifference";
import useApi from "../../hooks/useApi";
import { LoginResponse } from "../../interfaces/LoginInput";
import petOwnerService from "../../services/PetOwnerService";
import { toast } from "react-hot-toast";

interface CreateBookingModalProps {
  onClose: () => void;
  modalToggler: boolean;
  pet_owner_id: string;
  pet_provider_id: string;
  pet_provider_services: ProviderServiceType[];
}

const CreateBookingModal = (props: CreateBookingModalProps) => {
  const {
    onClose,
    modalToggler,
    pet_owner_id,
    pet_provider_id,
    pet_provider_services,
  } = props;
  const bookingForm = useForm<BookingRequestInterface>(
    {
      pet_owner_id,
      pet_provider_id,
      service_type_id: "",
      status: "PENDING",
      date: "",
      duration: "",
      time: "",
    },
    {
      date: emptyValidator,
      duration: emptyValidator,
      service_type_id: emptyValidator,
      time: emptyValidator,
    }
  );
  const [time, setTime] = useState({
    start: "",
    end: "",
  });

  const handleChangeBookingForm = (
    key: keyof BookingRequestInterface,
    value: any
  ) => {
    return bookingForm.onChange(key, value);
  };

  // Create Booking Api Request
  const bookingApiService = (data: BookingRequestInterface) =>
    petOwnerService.createNewBooking(data);

  const bookingApiRequest = useApi<LoginResponse, BookingRequestInterface>(
    bookingApiService
  );

  const handleModalClose = () => {
    bookingForm.reset();
    setTime({ start: "", end: "" });
    onClose();
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const timeInHours = calculateTimeDifferenceInHour(time.start, time.end);
    const bookingRequest: BookingRequestInterface = {
      ...bookingForm.form,
      time: time.start,
      duration: Math.ceil(timeInHours),
    };
    bookingApiRequest.reset();

    try {
      const createdBooking = await bookingApiRequest.request(bookingRequest);
      if (createdBooking?.code === 200) {
        handleModalClose();
        toast.success("Booking Successfully Created!");
      }
    } catch (error) {}
  };

  return (
    <PopModal onClose={handleModalClose} modalToggler={modalToggler}>
      <div className="create_booking_modal">
        <Header message="Book a Pet Care Provider" color="#1D1D1D" size="lg" />

        <div className="">
          <form className="booking_form_container" onSubmit={handleSubmit}>
            <div className="booking_input_container">
              <Dropdown
                id="Provider Service"
                label="Select a Service"
                error={bookingForm.formErrors.service_type_id}
                options={convertProviderServiceTypeToDropdown(
                  pet_provider_services
                )}
                dropdownProps={{
                  onChange: (val: { value: string; label: string }) => {
                    return handleChangeBookingForm(
                      "service_type_id",
                      val.value
                    );
                  },

                  required: true,
                }}
              />
              <Input
                id="Date"
                label="Date"
                error={bookingForm.formErrors.date}
                inputProps={{
                  type: "date",
                  required: true,
                  value: bookingForm.form.date,
                  onChange: (e) => {
                    handleChangeBookingForm("date", e.target.value);
                  },
                }}
              />
              <Input
                id="Start Time"
                label="Start Time"
                error={null}
                inputProps={{
                  type: "time",
                  required: true,
                  step: "60",
                  value: time.start,
                  onChange: (e) => {
                    setTime({ ...time, start: e.target.value });
                  },
                }}
              />
              <Input
                id="End Time"
                label="End Time"
                error={null}
                inputProps={{
                  type: "time",
                  required: true,
                  step: "60",
                  value: time.end,
                  onChange: (e) => {
                    setTime({ ...time, end: e.target.value });
                  },
                }}
              />
            </div>
            <Button
              label={"Book Pet Care Provider"}
              variant="primary"
              loading={bookingApiRequest.loading}
            />
          </form>
        </div>
      </div>
    </PopModal>
  );
};

export default CreateBookingModal;
