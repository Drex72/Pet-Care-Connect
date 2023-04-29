import React from "react";
import "./DashboardHomeCardStyles.scss";
import { MdBookOnline } from "react-icons/md";
import { AiOutlineBook } from "react-icons/ai";

interface IDashboardCard {
  label: string;
  value: number;
  onClickHandler?: () => void;
  icon: JSX.Element;
}

const DashboardHomeCard = (props: IDashboardCard) => {
  const { label, value, onClickHandler, icon } = props;
  return (
    <div className="dashboard_home_card_container" onClick={onClickHandler}>
      <div className="dashboard_home_card_container_inner">
        <div className="text_and_image">
          <div className="text">
            <h3>{value ?? "11"}</h3>
            <span>{label ?? "total Bookings"}</span>
          </div>
          <div className="image">
            {icon ?? <AiOutlineBook className="image_icon" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomeCard;
