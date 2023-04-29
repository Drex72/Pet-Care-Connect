import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./DashboardHomeStyles.scss";
import DashboardHomeCard from "../../components/DashboardHomeCard/DashboardHomeCard";
import { AiOutlineBook, AiOutlineTool } from "react-icons/ai";
import { MdOutlinePets } from "react-icons/md";
import BookingTable from "../../components/Table/BookingTable";
import { bookingTableHeadPetOwner } from "../../data/usersData";
import {
  formatBookingDataForPetOwner,
  formatBookingDataForPetProvider,
} from "../../utils/formatBookingData";
import { getServiceToBeUsed } from "../../utils/geServiceToBeUsedBasedOnUserType";
import { IFormattedBooking } from "../../interfaces/BookingInterface";
import NoBookingCard from "../../components/NoBookings/NoBookingCard";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { AllRouteConstants } from "../../routes/routes";
import Loader from "../../components/Loader/Loader";
import DashboardMotivation from "../../components/DashboardMotivation/DashboardMotivation";

export const DashboardHome = () => {
  function setGreetings() {
    let date = new Date();
    let hours = date.getHours();
    let result = null;
    if (hours < 12) {
      result = "Morning";
    } else if (hours < 18) {
      result = "Afternoon";
    } else {
      result = "Evening";
    }
    return result;
  }

  const { data } = useAppSelector((state) => state.userReducer);

  const userService = getServiceToBeUsed(data?.user_type);

  const [bookings, setBookings] = useState({
    allBookings: [] as IFormattedBooking[],
    filteredBookings: [] as IFormattedBooking[],
    loading: false,
  });

  const getAllBookings = async () => {
    setBookings({
      ...bookings,
      loading: true,
    });
    try {
      const allBookings = await (
        await userService?.getAllBookings(data?.id)
      )?.data;
      const temp = allBookings.data.allBookings?.map((booking: any) => {
        if (data?.user_type === "PET-OWNER") {
          return formatBookingDataForPetOwner(booking);
        } else if (data?.user_type === "PET-PROVIDER") {
          return formatBookingDataForPetProvider(booking);
        }
      });
      setBookings({
        ...bookings,
        loading: false,
        allBookings: temp,
        filteredBookings: temp.slice(0, 4),
      });
    } catch (error) {
      setBookings({
        ...bookings,
        loading: false,
      });
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
    getAllBookings();
  }, []);
  return (
    <>
      {bookings.loading ? (
        <Loader />
      ) : (
        <div className="dashboard_main_container">
          <h1 className="dashboard_main_container_header">
            Good {setGreetings()},{" "}
            <span>{data?.first_name ?? "Oluwapelumi"} 👋🏿</span>
          </h1>

          <DashboardMotivation />
          <div className="dashboard_main_container_card_container">
            <DashboardHomeCard
              value={bookings.allBookings.length}
              label="Total Amount of Bookings"
              icon={<AiOutlineBook className="image_icon" />}
            />
            {data?.user_type === "PET-OWNER" ? (
              <DashboardHomeCard
                value={data?.pets.length}
                label="Total Amount of Pets"
                icon={<MdOutlinePets className="image_icon" />}
              />
            ) : (
              <DashboardHomeCard
                value={5}
                label="Total Amount of Services"
                icon={<AiOutlineTool className="image_icon" />}
              />
            )}
          </div>
          <div className="booking_table_container">
            <div className="appointment_list_container">
              {!bookings.filteredBookings.length ? (
                <NoBookingCard message="Looks like you don't have any bookings yet" />
              ) : (
                <div className="bookings_table_container">
                  <BookingTable
                    tableHead={bookingTableHeadPetOwner}
                    tableData={bookings.filteredBookings}
                    refreshBookings={getAllBookings}
                  />
                  {bookings.allBookings.length > 4 && (
                    <div className="booking_create_new_btn">
                      <Button
                        variant="primary"
                        label="See All Bookings"
                        width="20%"
                        onClick={() =>
                          navigate(AllRouteConstants.dashboardRoutes.booking)
                        }
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
