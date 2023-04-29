// Package Imports
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from "react-icons/ai";

import {
  dateIsNotAvailable,
  formatDate,
  formatShortWeekday,
  isDateInPast,
  isWeekendDay,
} from "../../utils/dateHandler";

// Drawer Styles
import "./BookingDrawerStyles.scss";
import Calendar from "react-calendar";

import { emptyValidator } from "../../validators/emptyValidator";
import { useForm } from "../../hooks/useForm";
import PopDrawer from "../../layout/DrawerLayout/DrawerLayout";
import { dateToStringAlgorithm } from "../../utils/convertDateToString";
import NoAvailableSlots from "./NoAvailableSlots";
import { ProviderServiceType } from "../../interfaces/ProviderServiceTypeInformation";

import {
  BookingRequestInterface,
  IFormattedBooking,
} from "../../interfaces/BookingInterface";
import petOwnerService from "../../services/PetOwnerService";
import { LoginResponse } from "../../interfaces/LoginInput";
import useApi from "../../hooks/useApi";
import { calculateTimeDifferenceInHour } from "../../utils/calculateTimeDifference";
import { toast } from "react-hot-toast";
import Button from "../Button/Button";
import Input, { Dropdown } from "../Input/Input";
import { convertProviderServiceTypeToDropdown } from "../../utils/convertProviderSrviceTypeToDropdown";
import AuthError from "../AuthComponents/AuthError/AuthError";

interface ICreateBookingDrawerProps {
  onClose: () => void;
  drawerToggler: boolean;
  pet_owner_id: string;
  pet_provider_id: string;
  pet_provider_services: ProviderServiceType[];
  bookings: IFormattedBooking[];
}

const CreateBookingDrawer = (props: ICreateBookingDrawerProps) => {
  const {
    onClose,
    drawerToggler,
    pet_owner_id,
    pet_provider_id,
    pet_provider_services,
    bookings,
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
  const [dateList, setDateList] = useState<string[]>([]);
  const onDrawerClose = () => {
    bookingForm.reset();
    setTime({ start: "", end: "" });
    onClose();
  };

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

  const [date, setDate] = useState(new Date());

  const [formattedDate, setFormattedDate] = useState<string>("");

  // Formats the Date to a string anytime a date is selected on the calendar
  useEffect(() => {
    //   console.log(date)
    const formattedRequestDate = formatDate(date);
    handleChangeBookingForm("date", formattedRequestDate);
    setFormattedDate(dateToStringAlgorithm(date));
  }, [date]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const timeInHours = calculateTimeDifferenceInHour(time.start, time.end);
    const bookingRequestForm: BookingRequestInterface = {
      ...bookingForm.form,
      time: time.start,
      duration: Math.ceil(timeInHours),
    };
    bookingApiRequest.reset();

    try {
      const createdBooking = await bookingApiRequest.request(
        bookingRequestForm
      );
      console.log(createdBooking);
        if (createdBooking?.code === 200) {
          onDrawerClose();
          toast.success("Booking Successfully Created!");
        }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PopDrawer onClose={onDrawerClose} drawerToggler={drawerToggler}>
      <div className="create_appointment_drawer">
        <div className="create_appointment_drawer_container">
          {/* This is the Share and Cancel Button Container */}
          <div className="create_appointment_drawer_head">
            <div className="create_appointment_drawer_head_container">
              <AiOutlineClose
                className="create_appointment_drawer_head_icon"
                onClick={onDrawerClose}
              />
            </div>
          </div>
          <div className="create_appointment_drawer_body">
            <div className="create_appointment_drawer_body_container">
              {/* This is the Appointment Calendar */}
              <div className="create_appointment_drawer_body_calendar">
                <Calendar
                  calendarType="ISO 8601"
                  formatShortWeekday={formatShortWeekday}
                  tileClassName={({ date }: { date: any }) =>
                    isWeekendDay(date)
                      ? `weekend ${isDateInPast(date) ? "weekend_past" : ""}`
                      : isDateInPast(date)
                      ? "react_calendar_tile_disabled"
                      : ""
                  }
                  showNeighboringMonth={false}
                  onChange={(date: any) => setDate(date as Date)}
                  value={date}
                  view={"month"}
                  nextLabel={<AiOutlineRight />}
                  prevLabel={<AiOutlineLeft />}
                />
              </div>

              <div className="create_appointment_drawer_body_date_information">
                <h2 className="create_appointment_drawer_body_date_information_date">
                  {formattedDate}
                </h2>

                {dateIsNotAvailable(date, bookings) ? (
                  <NoAvailableSlots />
                ) : (
                  <div className="">
                    <form
                      className="booking_form_container"
                      onSubmit={handleSubmit}
                    >
                      <div className="booking_input_container">
                        <Dropdown
                          id="Provider Service"
                          label="Select a Service"
                          error={bookingForm.formErrors.service_type_id}
                          options={convertProviderServiceTypeToDropdown(
                            pet_provider_services
                          )}
                          dropdownProps={{
                            onChange: (val: {
                              value: string;
                              label: string;
                            }) => {
                              return handleChangeBookingForm(
                                "service_type_id",
                                val.value
                              );
                            },

                            required: true,
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
                      <AuthError error={bookingApiRequest.error?.message} />
                      <Button
                        label={"Book Pet Care Provider"}
                        variant="primary"
                        type="submit"
                        loading={bookingApiRequest.loading}
                      />
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PopDrawer>
  );
};

export default CreateBookingDrawer;
