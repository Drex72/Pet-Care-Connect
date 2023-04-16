import React, { useState } from "react";
import { userData } from "../../data/usersData";
import { SlOptionsVertical } from "react-icons/sl";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  BookingStatus,
  IFormattedBooking,
} from "../../interfaces/BookingInterface";
import {
  Table,
  TableBodyContainer,
  TableBodyRow,
  TableBodyRowChild,
  TableHead,
  TableHeadContainer,
} from "./Table";
import Popover from "@mui/material/Popover";
import { getServiceToBeUsed } from "../../utils/geServiceToBeUsedBasedOnUserType";
import { UserType } from "../../interfaces/User";
import {
  bookingActionName,
  statusClassName,
} from "../../utils/customBookingActions";
import Button from "../Button/Button";
import PayForBookingDrawer from "../Drawers/PayForBookingDrawer";
import PaidBookingModal from "../Modals/PaidBookingModal";

interface IBookingTable {
  tableHead: string[];
  tableData: IFormattedBooking[];
  refreshBookings: () => void;
}

const BookingTable = ({
  tableHead,
  tableData,
  refreshBookings,
}: IBookingTable) => {
  const { data } = useAppSelector((state) => state.userReducer);
  const userService = getServiceToBeUsed(data?.user_type);
  const [currentItem, setCurrentItem] = useState<IFormattedBooking>();
  const [handlePopOverAction, setHandlePopOverAction] = useState({
    status: false,
    bookingInformation: null as IFormattedBooking | null,
    statusToBeChanged: null as BookingStatus | null,
  });
  const [bookingUpdating, setBoookingUpdating] = useState(false);
  const [payForBooking, setPayForBooking] = useState(false);
  const [bookingPaid, setBookingPaid] = useState(false);
  const handleDrawerClose = () => {
    setPayForBooking(false);
  };

  const handleDrawerOpen = () => {
    setAnchorEl(null);
    setPayForBooking(true);
  };
  const handleUpdateBooking = async (id: string, status: BookingStatus) => {
    setBoookingUpdating(true);
    try {
      const updatedBooking = await (
        await userService?.updateBooking(id, status)
      )?.data;
      setBoookingUpdating(false);

      if (updatedBooking?.status) {
        if (status === "CONFIRMED") {
          return setBookingPaid(true);
        } else {
          refreshBookings();
        }
      }
    } catch (error) {
      console.log(error);
      setBoookingUpdating(false);
    }
  };

  // Setting the Anchor Element from the Pop Over
  const [anchorEl, setAnchorEl] = useState<SVGElement | null>(null);

  /**
   * Sets the Anchor Element to the Selected Element
   * @param event Takes in the Event Object
   */
  const handleClick = (event: React.MouseEvent<SVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Sets the Anchor Element to Null
   */

  const handleClearPopOverAction = () => {
    return setHandlePopOverAction({
      bookingInformation: null,
      status: false,
      statusToBeChanged: null,
    });
  };
  const handleClose = () => {
    setAnchorEl(null);
    setTimeout(() => {
      handleClearPopOverAction();
    }, 500);
  };

  const handleClickBookingBtn = (
    selectedBooking: IFormattedBooking,
    status: BookingStatus
  ) => {
    setHandlePopOverAction({
      bookingInformation: selectedBooking,
      statusToBeChanged: status,
      status: true,
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      {currentItem?.serviceCharge && (
        <PayForBookingDrawer
          drawerToggler={payForBooking}
          onClose={handleDrawerClose}
          bookingItem={currentItem}
          bookingPaying={bookingUpdating}
          payForBooking={handleUpdateBooking}
        />
      )}

      <PaidBookingModal
        modalToggler={bookingPaid}
        onClose={() => {
          refreshBookings();
          setBookingPaid(false);
        }}
      />
      <Table>
        <TableHeadContainer>
          <>
            {tableHead.map((head) => (
              <TableHead label={head} key={head} />
            ))}
          </>
        </TableHeadContainer>
        <TableBodyContainer>
          <>
            {tableData.map((item, index) => (
              <TableBodyRow key={index}>
                <TableBodyRowChild>{item.name}</TableBodyRowChild>
                <TableBodyRowChild>{item.email}</TableBodyRowChild>
                <TableBodyRowChild>{item.serviceName}</TableBodyRowChild>
                <TableBodyRowChild>{item.serviceCharge}</TableBodyRowChild>
                <TableBodyRowChild>{item.date}</TableBodyRowChild>
                <TableBodyRowChild>
                  <div className={statusClassName(item.status)}>
                    {item.status}
                  </div>
                </TableBodyRowChild>
                <TableBodyRowChild>
                  <SlOptionsVertical
                    aria-describedby={id}
                    className="bookingActions"
                    onClick={(e) => {
                      handleClick(e);
                      setCurrentItem(item);
                    }}
                  />
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    {handlePopOverAction.status &&
                    handlePopOverAction.bookingInformation!.id ===
                      currentItem?.id ? (
                      <div className="update_booking_state">
                        <h4>
                          Are you sure you want to{" "}
                          {bookingActionName(
                            handlePopOverAction!
                              .statusToBeChanged as BookingStatus
                          )}{" "}
                          this booking?
                        </h4>
                        <div className="booking_action_button_container">
                          <button
                            onClick={handleClearPopOverAction}
                            className="rejected_status_button status_button"
                          >
                            No
                          </button>
                          <Button
                            variant="primary"
                            label="Yes"
                            onClick={() => {
                              handleUpdateBooking(
                                handlePopOverAction.bookingInformation!.id,
                                handlePopOverAction!
                                  .statusToBeChanged as BookingStatus
                              );
                            }}
                            loading={bookingUpdating}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="booking_table_actions_container">
                        <BookingTableActionBtn
                          handleDrawerOpen={handleDrawerOpen}
                          userType={data?.user_type}
                          currentBookingSelected={
                            currentItem as IFormattedBooking
                          }
                          handleClickBookingBtn={handleClickBookingBtn}
                        />
                      </div>
                    )}
                  </Popover>
                </TableBodyRowChild>
              </TableBodyRow>
            ))}
          </>
        </TableBodyContainer>
      </Table>
    </div>
  );
};

export default BookingTable;

interface BookingTableActionBtnProps {
  userType: UserType;
  currentBookingSelected: IFormattedBooking;
  handleClickBookingBtn: (
    key: IFormattedBooking,
    status: BookingStatus
  ) => void;
  handleDrawerOpen: () => void;
}

const BookingTableActionBtn = (props: BookingTableActionBtnProps) => {
  const {
    userType,
    currentBookingSelected,
    handleClickBookingBtn,
    handleDrawerOpen,
  } = props;

  return (
    <>
      {currentBookingSelected.status === "CONFIRMED" ? (
        <button>View Booking</button>
      ) : (
        <>
          {userType === "PET-PROVIDER" && (
            <>
              {currentBookingSelected.status !== "PAYMENTPENDING" && (
                <button
                  disabled={currentBookingSelected?.status === "REJECTED"}
                  onClick={() =>
                    handleClickBookingBtn(
                      currentBookingSelected!,
                      "PAYMENTPENDING"
                    )
                  }
                >
                  Confirm Booking
                </button>
              )}
              <button
                disabled={currentBookingSelected?.status === "REJECTED"}
                className="reject_button"
                onClick={() =>
                  handleClickBookingBtn(currentBookingSelected!, "REJECTED")
                }
              >
                Reject Booking
              </button>
            </>
          )}
          {userType === "PET-OWNER" && (
            <>
              <button
                disabled={currentBookingSelected?.status !== "PAYMENTPENDING"}
                onClick={
                  handleDrawerOpen
                  // handleClickBookingBtn(currentBookingSelected!, "CONFIRMED")
                }
              >
                Pay for Booking
              </button>
              <button
                disabled={currentBookingSelected?.status === "REJECTED"}
                onClick={() =>
                  handleClickBookingBtn(currentBookingSelected!, "REJECTED")
                }
                className="reject_button"
              >
                Cancel Booking
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};
