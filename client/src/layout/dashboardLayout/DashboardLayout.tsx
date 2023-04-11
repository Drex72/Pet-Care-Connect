import "./DashboardLayoutStyles.scss";
import DashboardMobile from "./DashboardMobile/DashboardMobile";
import DashboardDesktop from "./DashboardDesktop/DashboardDesktop";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  getSavedKey,
  getServiceToBeUsed,
} from "../../utils/geServiceToBeUsedBasedOnUserType";
import { LoginResponse } from "../../interfaces/LoginInput";
import useApi from "../../hooks/useApi";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { RequireAuth } from "../../components/HigherOrderComponents";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/UserSlice";

const DashboardLayout = () => {
  const { data } = useAppSelector((store) => store.userReducer);
  const dispatch = useDispatch();

  const userService = getServiceToBeUsed(data?.user_type!);
  const userInformationKey = getSavedKey(data?.user_type!);

  const [profileFetching, setProfileFetching] = useState(true);

  const getUserProfileDetailsPromise = async () => {
    setProfileFetching(true);
    try {
      const user = await (await userService?.getUserDetails(data.id))?.data;
      dispatch(userActions.setProfile(user?.data[userInformationKey!]));
      setProfileFetching(false);
    } catch (error) {}
  };
  useEffect(() => {
    if (!data?.region) {
      getUserProfileDetailsPromise();
    } else {
      setProfileFetching(false);
    }
  }, []);
  return (
    <RequireAuth>
      <>
        {profileFetching ? (
          <Loader />
        ) : (
          <div className="dashboard_layout_container animate__animated animate__fadeIn">
            {/* Desktop View */}
            <DashboardDesktop />
            {/* Mobile View */}
            <DashboardMobile />
          </div>
        )}
      </>
    </RequireAuth>
  );
};

export default DashboardLayout;
