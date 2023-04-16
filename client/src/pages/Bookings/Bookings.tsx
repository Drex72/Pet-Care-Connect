import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthHeader } from "../../components/AuthComponents/AuthHeader/AuthHeader";
import Button from "../../components/Button/Button";
import { Dropdown } from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";
import NoBookingCard from "../../components/NoBookings/NoBookingCard";
import Search from "../../components/Search/Search";
import BookingTable from "../../components/Table/BookingTable";
import { bookingFilterOptions } from "../../data/BookingsFilterOptions";
import { bookingTableHeadPetOwner } from "../../data/usersData";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  BookingStatus,
  IFormattedBooking,
} from "../../interfaces/BookingInterface";
import { AllRouteConstants } from "../../routes/routes";
import {
  filterBookingBySearch,
  filterBookingByStatus,
} from "../../utils/bookingsSearch";
import {
  formatBookingDataForPetOwner,
  formatBookingDataForPetProvider,
} from "../../utils/formatBookingData";
import { getServiceToBeUsed } from "../../utils/geServiceToBeUsedBasedOnUserType";
import "./BookingStyles.scss";

export const Bookings = () => {
  const navigate = useNavigate();

  const { data } = useAppSelector((state) => state.userReducer);
  const userService = getServiceToBeUsed(data?.user_type);

  const [bookings, setBookings] = useState({
    allBookings: [] as IFormattedBooking[],
    filteredBookings: [] as IFormattedBooking[],
    loading: false,
  });

  const [bookingFilterKeys, setBookingFilterKeys] = useState({
    search: "",
    sortByBookingState: "" as BookingStatus,
  });

  const filterBooking = async () => {
    const searchedResult = filterBookingBySearch(
      bookings.allBookings,
      bookingFilterKeys.search
    ).data;
    const bookingStatusFilter = filterBookingByStatus(
      searchedResult,
      bookingFilterKeys.sortByBookingState
    ).data;

    setBookings({ ...bookings, filteredBookings: bookingStatusFilter });
  };

  useEffect(() => {
    filterBooking();
  }, [bookingFilterKeys]);

  const handleFilterBooking = (value: BookingStatus) => {
    setBookingFilterKeys({ ...bookingFilterKeys, sortByBookingState: value });
  };

  const handleSearchForBooking = (value: string) => {
    setBookingFilterKeys({
      ...bookingFilterKeys,
      search: value,
    });
  };

  const handleCreateNewBooking = () => {
    return navigate(
      AllRouteConstants.dashboardRoutes.pet_owner_routes.petCareProviders
    );
  };

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
        filteredBookings: temp,
      });
    } catch (error) {
      setBookings({
        ...bookings,
        loading: false,
      });
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);
  return (
    <>
      {bookings.loading ? (
        <Loader />
      ) : (
        <div className="animate__animated animate__fadeIn">
          <AuthHeader message="Bookings" color="#157cff" />
          <div className="booking_header_components">
            <Search
              searchCustomClass="booking_search"
              placeholder="Search By Service Name"
              onChange={handleSearchForBooking}
              label="Search For Booking"
            />
            <Dropdown
              dropdownClassName="booking_filter"
              id="bookingfilter"
              label="Filter By:"
              error={null}
              options={bookingFilterOptions}
              dropdownProps={{
                onChange: (val: { value: string; label: string }) => {
                  handleFilterBooking(val.value as BookingStatus);
                },
              }}
            />
          </div>
          {data?.user_type === "PET-OWNER" && (
            <div className="booking_create_new_btn">
              <Button
                variant="primary"
                label="Create New Booking"
                width="20%"
                onClick={handleCreateNewBooking}
              />
            </div>
          )}
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
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
