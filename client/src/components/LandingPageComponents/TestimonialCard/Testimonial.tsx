import React from "react";
import Quote from "../../../assets/images/quote.svg";
import Star from "../../../assets/images/Star.svg";

import "./TestimonialStyles.scss";
interface TestimonialProps {
  avatar: string;
}

const Testimonial = (props: TestimonialProps) => {
  const { avatar } = props;
  return (
    <div className="testimonial_card">
      <div className="testimonial_card_container">
        <div className="testimonial_avatar_and_content_container">
          <div className="user_avatar_information">
            <img src={avatar} alt="avatar" />
          </div>

          <div className="user__content_information">
            <h3>Peter Patter</h3>
            <p>Co-founder, PetaCare Inc.</p>
          </div>
        </div>

        <div className="testimonial_star_list">
          <div className="testimonial_star_container">
            <img src={Star} alt="star" />
          </div>
          <div className="testimonial_star_container">
            <img src={Star} alt="star" />
          </div>
          <div className="testimonial_star_container">
            <img src={Star} alt="star" />
          </div>
          <div className="testimonial_star_container">
            <img src={Star} alt="star" />
          </div>
          <div className="testimonial_star_container">
            <img src={Star} alt="star" />
          </div>
        </div>

        <div className="main_testimonial_content">
          <div className="main_testimonial_content_quote_image_container">
            <img src={Quote} alt="quote" />
          </div>
          <p className="main_testimonial_content_text_container">
            Lorem ipsum dolor sit amet consectetur. Vulputate donec egestas id
            commodo. Dis est mattis ac non aliquet donec. Sed risus nisl
            tristique faucibus quis.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
