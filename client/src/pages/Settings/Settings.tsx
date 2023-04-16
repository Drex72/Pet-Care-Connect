import { useEffect, useState } from "react";
import userimage from "../../assets/images/image1.svg";
import { useNavigate } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import "./SettingsStyles.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import UploadAvatarModal from "./Modals/UploadAvatarModal";
import { useForm } from "../../hooks/useForm";
import { useAppSelector } from "../../hooks/useAppSelector";
import { UserResponseInformation } from "../../interfaces/BasicUserInterface";
import { AuthHeader } from "../../components/AuthComponents/AuthHeader/AuthHeader";
import PhoneInputField from "../../components/Input/PhoneInput";
import { LoginResponse } from "../../interfaces/LoginInput";
import useApi from "../../hooks/useApi";
import { useDispatch } from "react-redux";
import {
  getSavedKey,
  getServiceToBeUsed,
} from "../../utils/geServiceToBeUsedBasedOnUserType";
import { userActions } from "../../redux/UserSlice";
import Loader from "../../components/Loader/Loader";

export const Settings = () => {
  const [profileMode, setProfileMode] = useState<"edit" | "view">("view");
  const [uploadAvatar, setUploadAvatar] = useState<boolean>(false);
  const { data: userData } = useAppSelector((state) => state.userReducer);
  const [imageBlob, setImageBlob] = useState<Blob | null>();
  const [data, setData] = useState(userData ?? {});
  const dispatch = useDispatch();

  const userService = getServiceToBeUsed(userData?.user_type!);
  const userInformationKey = getSavedKey(userData?.user_type!);

  const [profileFetching, setProfileFetching] = useState(false);
  const [userUpdating, setUserUpdating] = useState(false);

  const { validators } = useAppSelector(
    (state) => state.registrationFormReducer
  );

  const checkIfThereIsImage = () => {
    const formData = new FormData();
    if (imageBlob) {
      formData.append("petOwnerId", basicUserProfileForm.form.id);
      formData.append("file", imageBlob);
      return formData;
    } else {
      return null;
    }
  };

  const basicUserProfileForm = useForm<UserResponseInformation>(
    {
      id: data?.id ?? "",
      email: data?.email ?? "",
      first_name: data?.first_name ?? "",
      last_name: data?.last_name ?? "",
      region: data?.region ?? "",
      postal_code: data?.postal_code ?? "",
      street: data?.street ?? "",
      city: data?.city ?? "",
      phone_number: data?.phone_number ?? "",
      user_avatar: data?.user_avatar ?? "",
    },
    {
      ...validators.baseUserFieldsValidation,
      ...validators.baseAddressInformationValidation,
    }
  );
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const itemKey = e.target.name as keyof UserResponseInformation;
    const itemValue = e.target.value;
    basicUserProfileForm.onChange(itemKey, itemValue);
  };

  const updateApiService = (data: UserResponseInformation) =>
    userService!.updateUserDetails(data);

  const uploadAvatarService = (data: FormData) =>
    userService!.updateUserAvatar(data);

  const updateApiRequest = useApi<LoginResponse, UserResponseInformation>(
    updateApiService
  );
  const uploadAvatarRequest = useApi<LoginResponse, FormData>(
    uploadAvatarService
  );

  const handleSubmit = async (e: any) => {
    setUserUpdating(true);
    e.preventDefault();
    basicUserProfileForm.resetFormErrors();
    updateApiRequest.reset();
    const valid = basicUserProfileForm.validate();
    const formData = checkIfThereIsImage();

    if (valid) {
      try {
        const user = await updateApiRequest.request(basicUserProfileForm.form);
        if (formData) {
          for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
          }
          await uploadAvatarRequest.request(formData);
          window.location.reload();
        }
        if (user!.code === 200) {
          await getUserProfileDetailsPromise();
          setProfileMode("view");
        }
        setUserUpdating(false);
      } catch (error) {
        console.error(error);
        setUserUpdating(false);
      }
    } else {
      setUserUpdating(false);
    }
  };

  const getUserProfileDetailsPromise = async () => {
    setProfileFetching(true);
    try {
      const user = await (await userService?.getUserDetails(userData.id))?.data;
      dispatch(userActions.setProfile(user?.data[userInformationKey!]));
      setData(userActions.setProfile(user?.data[userInformationKey!]));
      setProfileFetching(false);
    } catch (error) {}
  };

  useEffect(() => {
    setData(userData);
    getUserProfileDetailsPromise();
  }, []);

  return (
    <>
      {profileFetching ? (
        <Loader />
      ) : (
        <div className="settings_profile animate__animated animate__fadeIn">
          <UploadAvatarModal
            modalToggler={uploadAvatar}
            handlePictureUpload={(picture: string, blob: Blob | null) => {
              basicUserProfileForm.onChange("user_avatar", picture);
              setImageBlob(blob);
            }}
            onClose={() => {
              setUploadAvatar(false);
            }}
          />

          {/* Avatar */}

          <form className="profile-form" onSubmit={handleSubmit}>
            <AuthHeader message="Settings" color="#157cff" />
            <div className="profile_form_avatar_container">
              <div className="profile_form_avatar">
                <img
                  src={
                    basicUserProfileForm.form.user_avatar === ""
                      ? userimage
                      : basicUserProfileForm.form.user_avatar
                  }
                />
                {profileMode === "edit" && (
                  <>
                    <BsPencil
                      className="profile_form_avatar_icon"
                      style={{ color: "#5700A2" }}
                      onClick={() => {
                        setUploadAvatar(true);
                      }}
                    />
                  </>
                )}
              </div>
              <div className="profile_form_avatar_information">
                <h2>
                  {basicUserProfileForm.form.first_name}{" "}
                  {basicUserProfileForm.form.last_name}
                </h2>
                <p>UserID: {basicUserProfileForm.form.id ?? "Id 1"}</p>
              </div>
            </div>
            <h3 className="settings_profile_header_text">
              Personal Information
            </h3>
            <div className="settings_profile_input_fields">
              <Input
                id="firstName"
                label="First Name"
                error={basicUserProfileForm.formErrors.first_name}
                inputClassName="profile_form_input_field"
                inputProps={{
                  name: "first_name",
                  placeholder: "Enter your first name",
                  value: basicUserProfileForm.form.first_name,
                  onChange: handleChange,
                  readOnly: profileMode === "view" ? true : false,
                }}
              />
              <Input
                id="Last Name"
                label="Last Name"
                error={basicUserProfileForm.formErrors.last_name}
                inputClassName="profile_form_input_field"
                inputProps={{
                  name: "last_name",
                  placeholder: "Enter your last name",
                  value: basicUserProfileForm.form.last_name,
                  onChange: handleChange,
                  readOnly: profileMode === "view" ? true : false,
                }}
              />
              <Input
                id="Email"
                label="Email"
                error={basicUserProfileForm.formErrors.email}
                inputClassName="profile_form_input_field"
                inputProps={{
                  name: "email",
                  type: "email",
                  placeholder: "Enter your Email",
                  value: basicUserProfileForm.form.email,
                  onChange: handleChange,
                  readOnly: profileMode === "view" ? true : false,
                }}
              />
              {profileMode === "view" ? (
                <Input
                  id="Phone Number"
                  label="Phone Number"
                  error={basicUserProfileForm.formErrors.phone_number}
                  inputClassName="profile_form_input_field"
                  inputProps={{
                    placeholder: "No Phone Number",
                    value: basicUserProfileForm.form.phone_number,
                    onChange: handleChange,
                    name: "phone_number",
                    readOnly: profileMode === "view" ? true : false,
                  }}
                />
              ) : (
                <PhoneInputField
                  id="Phone Number"
                  label="Phone Number"
                  error={basicUserProfileForm.formErrors.phone_number}
                  value={basicUserProfileForm.form.phone_number}
                  inputClassName="profile_form_input_field"
                  onChange={(value: string) => {
                    basicUserProfileForm.onChange("phone_number", `+${value}`);
                  }}
                  inputProps={{
                    name: "parent_phone_number",
                    required: true,
                    autoFocus: true,
                    readOnly: profileMode == "edit" ? false : true,
                  }}
                />
              )}
            </div>
            <h3 className="settings_profile_header_text">
              Address Information
            </h3>
            <div className="settings_profile_input_fields">
              <Input
                id="Street"
                label="Street"
                error={basicUserProfileForm.formErrors.street}
                inputClassName="profile_form_input_field"
                inputProps={{
                  name: "street",
                  placeholder: "Enter your Street",
                  value: basicUserProfileForm.form.street,
                  onChange: handleChange,
                  readOnly: profileMode === "view" ? true : false,
                }}
              />
              <Input
                id="City"
                label="City"
                error={basicUserProfileForm.formErrors.city}
                inputClassName="profile_form_input_field"
                inputProps={{
                  name: "city",
                  placeholder: "Enter your City",
                  value: basicUserProfileForm.form.city,
                  onChange: handleChange,
                  readOnly: profileMode === "view" ? true : false,
                }}
              />
              <Input
                id="Postal Code"
                label="Postal Code"
                error={basicUserProfileForm.formErrors.postal_code}
                inputClassName="profile_form_input_field"
                inputProps={{
                  name: "postal_code",
                  placeholder: "Enter your Postal Code",
                  value: basicUserProfileForm.form.postal_code,
                  onChange: handleChange,
                  readOnly: profileMode === "view" ? true : false,
                }}
              />

              <Input
                id="Region"
                label="Region"
                error={basicUserProfileForm.formErrors.region}
                inputClassName="profile_form_input_field"
                inputProps={{
                  name: "region",
                  placeholder: "Enter your Region",
                  value: basicUserProfileForm.form.region,
                  onChange: handleChange,
                  readOnly: profileMode === "view" ? true : false,
                }}
              />
            </div>

            {profileMode === "edit" ? (
              <div className="settings_profile_submit_cancel_buttons">
                <Button
                  variant="primary"
                  label={"Save Changes"}
                  loading={userUpdating}
                />
                <Button
                  buttonClassName="settings_profile_cancel"
                  variant="secondary"
                  label={"Cancel"}
                  type="button"
                  onClick={() => {
                    setProfileMode("view");
                  }}
                />
              </div>
            ) : (
              <Button
                variant="primary"
                label={"Edit Profile"}
                buttonClassName="edit_settings_profile_button"
                type="button"
                onClick={() => {
                  setProfileMode("edit");
                }}
              />
            )}
          </form>
        </div>
      )}
    </>
  );
};
