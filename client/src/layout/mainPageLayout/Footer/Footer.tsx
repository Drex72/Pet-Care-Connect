import React from "react";
import "./FooterStyles.scss";
import { Link } from "react-router-dom";
import Logo from "../../../components/Logo/Logo";
const Footer = () => {
  return (
    <div className="footer animate__animated">
      <div className="footer_inner_container">
        <div className="footer_inner_container_rows">
          <Link to="/" className="footer_logo_container">
            <Logo />
          </Link>
          <div className="footer_inner_container_column">
            <h5>Account</h5>
            <li className="list_item">
              <a href="/auth/register">Create an Account</a>
            </li>

            <li className="list_item">
              <a href="/auth/login">Login</a>
            </li>

            <li className="list_item">
              <a href="/#">Customer Care</a>
            </li>
          </div>
          <div className="footer_inner_container_column">
            <h5>Services</h5>
            <li className="list_item">
              <a href="/signup">Find a pet care Provider</a>
            </li>

            <li className="list_item">
              <a href="/login">Book Appointment</a>
            </li>

            <li className="list_item">
              <a href="/#">Customer Care</a>
            </li>
          </div>

          <div className="footer_inner_container_column">
            <h5>Company</h5>
            <li className="list_item">
              <a href="/about-us">About Us</a>
            </li>

            <li className="list_item">
              <a href="/contact-us">Contact Us</a>
            </li>
          </div>
        </div>

        <div className="footer_inner_container_foot">
          <p>Privacy Policy</p>
          <p>Terms and Condition</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
