// import userimage from "../../assets/userimage.svg";
import userimage from "../../assets/images/dummyAvatar.png";

import { useNavigate } from "react-router-dom";
import "./NotificationsAndAvatarStyles.scss";
import { MdNotifications } from "react-icons/md";
import { useAppSelector } from "../../hooks/useAppSelector";
const NotificationsAndAvatar = () => {
  const { data } = useAppSelector((store) => store.userReducer);


  return (
    <div className="notifications_and_avatar_container">
      <div className="dashboard_notifications">
        <MdNotifications className="dashboard_notifications_icon" />
        <div className="dashboard_notifications_counter" />
      </div>

      <div className="dashboard_avatar">
        {data?.first_name ? data?.first_name[0] : "U"}
      </div>
    </div>
  );
};

export default NotificationsAndAvatar;
