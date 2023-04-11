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

interface IBookingTable {
  tableHead: string[];
  tableData: IFormattedBooking[];
}

const BookingTable = ({ tableHead, tableData }: IBookingTable) => {
  const { data } = useAppSelector((state) => state.userReducer);
  const userService = getServiceToBeUsed(data?.user_type);

  const statusClassName = (status: BookingStatus) => {
    switch (status) {
      case "CONFIRMED":
        return "confirmed_status_button status_button";
      case "PAYMENTPENDING":
        return "p-pending_status_button status_button";
      case "PENDING":
        return "pending_status_button status_button";
      case "REJECTED":
        return "rejected_status_button status_button";
      default:
        return "";
    }
  };

  const handleUpdateBooking = async (id: string, status: BookingStatus) => {
    try {
      const updatedBooking = await (
        await userService?.updateBooking(id, status)
      )?.data;
    } catch (error) {
      console.log(error);
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
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
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
                    onClick={handleClick}
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
                    <div className="booking_table_actions_container">
                      {data?.user_type === "PET-PROVIDER" && (
                        <>
                          <button>Confirm Booking</button>
                          <button className="reject_button">
                            Reject Booking
                          </button>
                        </>
                      )}
                      {data?.user_type === "PET-OWNER" && (
                        <>
                          {item.status === "CONFIRMED" ? (
                            <button>View Booking</button>
                          ) : (
                            <>
                              <button
                                disabled={item.status !== "PAYMENTPENDING"}
                              >
                                Pay for Booking
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateBooking(item.id, "REJECTED")
                                }
                                className="reject_button"
                              >
                                Cancel Booking
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
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
