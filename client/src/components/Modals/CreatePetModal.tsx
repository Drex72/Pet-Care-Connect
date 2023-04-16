import image from "../../assets/images/femaleAvatar.svg";
import { useForm } from "../../hooks/useForm";
import PopModal from "../../layout/ModelLayout/ModalLayout";
import Button from "../Button/Button";
import Header from "../Header/Header";
import Input, { Dropdown, TextArea } from "../Input/Input";
import { BookingRequestInterface } from "../../interfaces/BookingInterface";
import "./ModalStyles.scss";
import { emptyValidator } from "../../validators/emptyValidator";
import { useEffect, useState } from "react";
import { ProviderServiceType } from "../../interfaces/ProviderServiceTypeInformation";
import { convertProviderServiceTypeToDropdown } from "../../utils/convertProviderSrviceTypeToDropdown";
import { calculateTimeDifferenceInHour } from "../../utils/calculateTimeDifference";
import useApi from "../../hooks/useApi";
import { LoginResponse } from "../../interfaces/LoginInput";
import petOwnerService from "../../services/PetOwnerService";
import { toast } from "react-hot-toast";
import { PetInformationInterface } from "../../interfaces/PetInformationInterface";
import { useAppSelector } from "../../hooks/useAppSelector";
import AuthError from "../AuthComponents/AuthError/AuthError";

interface CreatePetModalProps {
  onClose: () => void;
  modalToggler: boolean;
}

const CreatePetModal = (props: CreatePetModalProps) => {
  const { onClose, modalToggler } = props;

  // SignUp Form
  const { validators } = useAppSelector(
    (state) => state.registrationFormReducer
  );

  const registrationForm = useForm<PetInformationInterface>(
    {
      pet_birthday: "",
      pet_breed: "",
      pet_gender: "male",
      pet_name: "",
      pet_special_needs: "",
    },
    { ...validators.petCareProviderServiceValidation }
  );
  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    registrationForm.onChange(
      e.target.name as keyof PetInformationInterface,
      e.target.value
    );
  };

  // Create Booking Api Request
  const createPetService = (data: PetInformationInterface) =>
    petOwnerService.createNewPet(data);

  const createPetRequest = useApi<LoginResponse, PetInformationInterface>(
    createPetService
  );

  const handleModalClose = () => {
    registrationForm.reset();
    onClose();
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    createPetRequest.reset();
    let valid = registrationForm.validate();

    if (valid) {
      try {
        const createdPet = await createPetRequest.request(
          registrationForm.form
        );
        if (createdPet?.code === 201) {
          handleModalClose();
          toast.success("Pet Successfully Created!");
        }
      } catch (error) {}
    }
  };

  return (
    <PopModal onClose={handleModalClose} modalToggler={modalToggler}>
      <div className="create_booking_modal">
        <Header message="Book a Pet Care Provider" color="#1D1D1D" size="lg" />
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="signup_form_flex_container">
              <Input
                id="Pet Name"
                label="Pet Name"
                error={registrationForm.formErrors.pet_name}
                inputProps={{
                  placeholder: "Enter your Pet Name",
                  value: registrationForm.form.pet_name,
                  onChange: handleInputChange,
                  name: "pet_name",
                  required: true,
                }}
              />
              <Input
                id="Pet Breed"
                label="Pet Breed"
                error={registrationForm.formErrors.pet_breed}
                inputProps={{
                  placeholder: "Enter your Pet Breed e.g Cat, Dog, etc",
                  value: registrationForm.form.pet_breed,
                  onChange: handleInputChange,
                  name: "pet_breed",
                  required: true,
                }}
              />
            </div>
            <div className="signup_form_flex_container">
              <Input
                id="Pet Birthday"
                label="Pet Birthday"
                error={registrationForm.formErrors.pet_birthday}
                inputClassName="styled-date"
                inputProps={{
                  placeholder: "Enter your Pet Birthday",
                  value: registrationForm.form.pet_birthday,
                  onChange: handleInputChange,
                  name: "pet_birthday",
                  required: true,
                  type: "date",
                }}
              />
              <Dropdown
                id="Pet Gender"
                label="Pet Gender"
                error={registrationForm.formErrors.pet_gender}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                dropdownProps={{
                  onChange: (val: { value: string; label: string }) => {
                    registrationForm.onChange("pet_gender", val.value);
                  },
                  required: true,
                }}
              />
            </div>
            <TextArea
              id="Pet Special Needs"
              label="Pet Special Needs"
              error={registrationForm.formErrors.pet_special_needs as any}
              inputClassName="pet_provider_service_description_input"
              textareaProps={{
                placeholder: "Enter your Pet Special Needs",
                value: registrationForm.form.pet_special_needs,
                onChange: handleInputChange,
                name: "pet_special_needs",
                required: true,
              }}
            />
          </div>
          <div className="register_submit_button_containers">
            <Button
              label={`Register`}
              loading={createPetRequest.loading}
              variant="primary"
              buttonClassName="signup_submit_button"
            />
          </div>

          <AuthError error={createPetRequest.error?.message} />
        </form>
      </div>
    </PopModal>
  );
};

export default CreatePetModal;
