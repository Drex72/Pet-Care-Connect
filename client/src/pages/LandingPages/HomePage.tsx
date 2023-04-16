import React from "react";
import Button from "../../components/Button/Button";
import LandingPageImage from "../../assets/images/dog.svg";
import SecurePaymentImage from "../../assets/images/padlock.svg";
import VettedProviderImage from "../../assets/images/puppy.svg";
import CashImage from "../../assets/images/cash.svg";
import CustomerSupportImage from "../../assets/images/support.svg";
import BookingImage from "../../assets/images/booking.svg";
import DeliveryImage from "../../assets/images/delivery.svg";
import PetImage from "../../assets/images/pet.svg";
import Avatar from "../../assets/images/profile2.svg";
import Testimonial from "../../components/LandingPageComponents/TestimonialCard/Testimonial";
import ChatBot from "../../components/LandingPageComponents/ChatBot/ChatBot";
import { useNavigate } from "react-router-dom";
import { AllRouteConstants } from "../../routes/routes";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleMoveToFindPetCare = () => {
    navigate(AllRouteConstants.landingRoute.findPetProvider);
  };
  return (
    <div className="home_page">
      <ChatBot />
      <section className="home_page-hero_section animate__animated animate__fadeIn">
        <div className="home_page-hero_section_container">
          <div className="text_container">
            <h2>
              Find the best <br /> <span>Pet Care</span> services <br /> in
              Scotland
            </h2>
            <p>
              Ensuring happy tails across Scotland - Discover the best Pet Care
              services.
            </p>
            <Button
              variant="primary"
              label="Find Pet Care Around"
              onClick={handleMoveToFindPetCare}
            />
          </div>
          <div className="image_container">
            <img loading="lazy" src={LandingPageImage} alt="A Dog and a Cat" />
          </div>
        </div>
      </section>
      <section className="home_page-selectUs_section animate__animated animate__fadeIn">
        <div className="home_page-selectUs_section_container">
          <h2>Why Choose Us?</h2>
          <div className="reasons_container">
            <div className="reasons">
              <div className="reason_image_container">
                <img
                  loading="lazy"
                  src={SecurePaymentImage}
                  alt="Secure Payment"
                />
              </div>
              <div className="reason_content">
                <h4>Secured Payment</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Vulputate donec
                  egestas id commodo. Dis est mattis ac non aliquet donec. Sed
                  risus nisl tristique faucibus quis.
                </p>
              </div>
            </div>
            <div className="reasons">
              <div className="reason_image_container">
                <img
                  loading="lazy"
                  src={VettedProviderImage}
                  alt="Vetted Service Provider"
                />
              </div>
              <div className="reason_content">
                <h4>Vetted Service Providers</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Vulputate donec
                  egestas id commodo. Dis est mattis ac non aliquet donec. Sed
                  risus nisl tristique faucibus quis.{" "}
                </p>
              </div>
            </div>
            <div className="reasons">
              <div className="reason_image_container">
                <img loading="lazy" src={CashImage} alt="Value for Money" />
              </div>
              <div className="reason_content">
                <h4>Value for money</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Vulputate donec
                  egestas id commodo. Dis est mattis ac non aliquet donec. Sed
                  risus nisl tristique faucibus quis.{" "}
                </p>
              </div>
            </div>
            <div className="reasons">
              <div className="reason_image_container">
                <img
                  loading="lazy"
                  src={CustomerSupportImage}
                  alt="Customer Support"
                />
              </div>
              <div className="reason_content">
                <h4>Customer Support 24/7</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Vulputate donec
                  egestas id commodo. Dis est mattis ac non aliquet donec. Sed
                  risus nisl tristique faucibus quis.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home_page-testimonial_section animate__animated animate__fadeIn">
        <div className="home_page-testimonial_section_container">
          <h2>Just Three Steps to Get Your Pet Wagging it's Tail</h2>
          <p className="testimonial_message">
            Lorem ipsum dolor sit amet consectetur.
          </p>

          <div className="services">
            <div className="services_container">
              <div className="service">
                <div className="service_image_container">
                  <img loading="lazy" src={BookingImage} alt="Online Booking" />
                </div>
                <div className="service_content">
                  <h4>Online Booking</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vulputate donec
                    egestas id commodo. Dis est mattis ac non aliquet donec. Sed
                    risus nisl tristique faucibus quis.{" "}
                  </p>
                </div>
              </div>
              <div className="service">
                <div className="service_image_container">
                  <img
                    loading="lazy"
                    src={DeliveryImage}
                    alt="Service Delivery"
                  />
                </div>
                <div className="service_content">
                  <h4>Service Delivery</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vulputate donec
                    egestas id commodo. Dis est mattis ac non aliquet donec. Sed
                    risus nisl tristique faucibus quis.
                  </p>
                </div>
              </div>
              <div className="service">
                <div className="service_image_container">
                  <img loading="lazy" src={PetImage} alt="A Happy Pet" />
                </div>
                <div className="service_content">
                  <h4>Happy Pet</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vulputate donec
                    egestas id commodo. Dis est mattis ac non aliquet donec. Sed
                    risus nisl tristique faucibus quis.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial_container">
            <h2>What people Say about Us</h2>
            <div className="all_testimonal_container">
              <Testimonial avatar={Avatar} />
              <Testimonial avatar={Avatar} />
              <Testimonial avatar={Avatar} />
              <Testimonial avatar={Avatar} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
