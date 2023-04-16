import React from "react";
import Button from "../../components/Button/Button";
import Input, { TextArea } from "../../components/Input/Input";
import { useForm } from "../../hooks/useForm";
import { emailValidator } from "../../validators/emailValidator";
import { emptyValidator } from "../../validators/emptyValidator";
import ContactUsImage from "../../assets/images/woman-petcare.jpg";

interface SupportFormInterface {
  email: string;
  firstname: string;
  lastname: string;
  message: string;
}

export const ContactUs = () => {
  const supportForm = useForm<SupportFormInterface>(
    {
      email: "",
      firstname: "",
      lastname: "",
      message: "",
    },
    {
      email: emailValidator,
      firstname: emptyValidator,
      lastname: emptyValidator,
      message: emptyValidator,
    }
  );
  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const itemKey = e.target.name as keyof SupportFormInterface;
    const itemValue = e.target.value;
    supportForm.onChange(itemKey, itemValue);
  };
  return (
    <div className="contact_us">
      <div className="contact_us_container">
        <div className="contact_us_container_image">
          <img src={ContactUsImage} loading="lazy" alt="Contact Us Image" />
        </div>
        <h3 className="settings_support_header_text">Want to Contact Us?</h3>
        <p className="settings_profile_candidate_information">
          Need help? You can reach out to our support team for assistance by
          sending us a message.
        </p>
        <form className="support-form">
          <div className="settings_support_input_fields">
            <div className="settings_support_input_fields_personal_info">
              <Input
                id="firstName"
                label="First Name"
                error={supportForm.formErrors.firstname}
                inputClassName="profile_form_input_field"
                inputProps={{
                  name: "firstname",
                  placeholder: "Enter your First name",
                  value: supportForm.form.firstname,
                  onChange: handleChange,
                }}
              />
              <Input
                id="lastName"
                label="Last Name"
                error={supportForm.formErrors.lastname}
                inputClassName="profile_form_input_field"
                inputProps={{
                  name: "lastname",
                  placeholder: "Enter your last name",
                  value: supportForm.form.lastname,
                  onChange: handleChange,
                }}
              />
            </div>
            <Input
              id="email"
              label="Email Adddress"
              error={supportForm.formErrors.email}
              inputClassName="profile_form_input_field"
              inputProps={{
                placeholder: "Enter your Email Address",
                value: supportForm.form.email,
                onChange: handleChange,
                name: "email",
              }}
            />
            <TextArea
              id="message"
              label="Message"
              error={supportForm.formErrors.message}
              inputClassName="profile_form_input_field"
              textareaProps={{
                placeholder: "Leave a Message",
                value: supportForm.form.message,
                onChange: handleChange,
                name: "message",
              }}
            />
          </div>
          <div className="support_form_submit_button">
            <Button label="Send Message" variant="primary" />
          </div>
        </form>
      </div>
    </div>
  );
};
