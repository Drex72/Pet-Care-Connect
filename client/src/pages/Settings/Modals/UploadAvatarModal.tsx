import takeAvatar from "../../../assets/icons/takeAvatar.svg";
import uploadAvatar from "../../../assets/icons/uploadAvatar.svg";
import "./SettingsModalStyles.scss";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import PopModal from "../../../layout/ModelLayout/ModalLayout";
import Button from "../../../components/Button/Button";
const UploadAvatarModal = ({
  onClose,
  modalToggler,
  handlePictureUpload,
}: {
  onClose: () => void;
  modalToggler: boolean;
  handlePictureUpload: (picture: string, blob: Blob | null) => void;
}) => {
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const [pictureBlob, setPictureBlob] = useState<Blob | null>(null);
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    setPictureBlob(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const dataURL = reader.result as any;
      const byteString = atob(dataURL?.split(",")[1]);
      var arrayBuffer = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(arrayBuffer);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const imageBlob = new Blob([arrayBuffer], { type: "image/jpeg" });
      // Create an image Url
      const imageUrl = URL.createObjectURL(imageBlob);
      setProfilePicture(imageUrl);
    };
  };
  return (
    <PopModal onClose={onClose} modalToggler={modalToggler}>
      <div className="settings_upload_avatar_modal_container">
        <h3 className="settings_upload_avatar_modal_header">
          Change Profile Picture
        </h3>
        {profilePicture ? (
          <div className="uploaded_image_container">
            <img src={profilePicture} alt="Profile Image" />
            <MdDelete className="delete_uploaded_image" />
          </div>
        ) : (
          <div className="uploadAndTakePhotosCardContainer">
            <div className="take_photo_card avatar_card">
              <img src={takeAvatar} alt="Take Avatar" />
              <span>Take Photo</span>
            </div>
            <label
              className="upload_image_label avatar_card"
              htmlFor="uploadFile"
            >
              <img src={uploadAvatar} alt="Upload Avatar" />
              <span>Upload Photo</span>
              <input
                id="uploadFile"
                type="file"
                accept="image/png, image/jpg, image/gif, image/jpeg"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        )}

        <Button
          label={"Update"}
          variant="primary"
          type="button"
          onClick={() => {
            onClose();
            handlePictureUpload(profilePicture, pictureBlob);
            setProfilePicture(null);
          }}
          width="50%"
          disable={!profilePicture}
        />
      </div>
    </PopModal>
  );
};

export default UploadAvatarModal;
