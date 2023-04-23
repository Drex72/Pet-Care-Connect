import Navbar from "./navbar";
import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="wrapper">
        <div className="header d-flex">
          <div className="text w-50">
            <div className="text-description">
              <h1>Find the best</h1>
              <span style={{ color: "#157CFF" }}>pet care</span> &nbsp;
              <span>services in</span>
              <h1>Scotland...</h1>
              <p>A beautiful tagline to represent your business</p>
              <Link to="/find-provider">
                <button
                  className="btn  fw-bold"
                  style={{
                    borderRadius: "0",
                    width: "300px",
                    height: "64px",
                    marginTop: "30px",
                  }}
                >
                  Find pet care around
                </button>
              </Link>
            </div>
          </div>
          <div className="image w-50">
            <img src="/images/dog.svg" alt="dog" className="img-fluid" />
          </div>
        </div>
        <div className="choose-us-section">
          <h4>Why Choose us?</h4>
          <div className="row grid-section">
            <div className=" col-xl-6 col-lg-6">
              <div className="info-section d-flex">
                <img src="/images/padlock.svg" alt="padlock" className="img-fluid" />{" "}
                &nbsp;&nbsp;&nbsp;
                <div className="payment-text">
                  <h4>Secured Payment</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vulputate donec
                    egestas id commodo. Dis est mattis ac non aliquet donec. Sed
                    risus nisl tristique faucibus quis.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className=" col-xl-6  col-lg-6">
              <div className="info-section d-flex">
                <img src="/images/puppy.svg" alt="puppy" className="img-fluid" />{" "}
                &nbsp;&nbsp;&nbsp;
                <div className="payment-text">
                  <h4>Vetted Service Providers</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vulputate donec
                    egestas id commodo. Dis est mattis ac non aliquet donec. Sed
                    risus nisl tristique faucibus quis.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className=" col-lg-6 col-lg-6">
              <div className="info-section d-flex">
                <img src="/images/cash.svg" alt="cash" className="img-fluid" />{" "}
                &nbsp;&nbsp;&nbsp;
                <div className="payment-text">
                  <h4>Value for money</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vulputate donec
                    egestas id commodo. Dis est mattis ac non aliquet donec. Sed
                    risus nisl tristique faucibus quis.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className=" col-lg-6 col-lg-6">
              <div className="info-section d-flex">
                <img src="/images/support.svg" alt="support" className="img-fluid" />
                &nbsp;&nbsp;&nbsp;
                <div className="payment-text">
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
        </div>
        <div className="pet-process">
          <div
            className="header-text"
            style={{ textAlign: "center", color: "#FFFFFF" }}
          >
            <h4>Just Three Steps to Get Your Pet </h4>
            <h4>Wagging Its Tail</h4>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className="process-involved">
            <div className="row grid-section gx-5">
              <div className=" col-xl-4 col-lg-4">
                <img src="/images/booking.svg" alt="booking" className="img-fluid" />{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="payment-text">
                  <h4>Online Booking</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vulputate donec
                    egestas id commodo. Dis est mattis ac non aliquet donec. Sed
                    risus nisl tristique faucibus quis.{" "}
                  </p>
                </div>
              </div>
              <div className=" col-xl-4 col-lg-4">
                <img src="/images/delivery.svg" alt="delivery" className="img-fluid" />{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="payment-text">
                  <h4>Service Delivery</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vulputate donec
                    egestas id commodo. Dis est mattis ac non aliquet donec. Sed
                    risus nisl tristique faucibus quis.{" "}
                  </p>
                </div>
              </div>
              <div className=" col-xl-4 col-lg-4">
                <img src="/images/pet.svg" alt="pet" className="img-fluid" />{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="payment-text">
                  <h4>Happy Pet</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vulputate donec
                    egestas id commodo. Dis est mattis ac non aliquet donec. Sed
                    risus nisl tristique faucibus quis.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="header-text"
            style={{
              textAlign: "center",
              color: "#FFFFFF",
              paddingTop: "100px",
              paddingBottom: "37px",
            }}
          >
            <h4>What People Say About Us? </h4>
          </div>
          <div
            className="row   "
            style={{ marginLeft: "20px", marginRight: "20px" }}
          >
            <div className="  col-xl-4 col-lg-4">
              <div className="card">
                <div className="d-flex" style={{ paddingBottom: "27px" }}>
                  <img src="/images/profile1.svg" alt="avatar" height="90px" width="90px" />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div style={{ paddingTop: "10px" }}>
                    <h4>Peter Patter</h4>
                    <p style={{ fontSize: "14px" }}>
                      Co-founder, PetaCare Inc.
                    </p>
                  </div>
                </div>
                <div className="d-flex" style={{ paddingBottom: "27px" }}>
                  <img src="/images/star.svg" alt="star" />
                  &nbsp;&nbsp;
                  <img src="/images/star.svg" alt="star" />
                  &nbsp;&nbsp;
                  <img src="/images/star.svg" alt="star" />
                  &nbsp;&nbsp;
                  <img src="/images/star.svg" alt="star" />
                  &nbsp;&nbsp;
                  <img src="/images/star.svg" alt="star" />
                  &nbsp;&nbsp;
                </div>
                <img src="images/quote.svg" alt="quote" height="18px" width="18px" />
                <p style={{ marginTop: "11px" }}>
                  Lorem ipsum dolor sit amet consectetur. Vulputate donec
                  egestas id commodo. Dis est mattis ac non aliquet donec. Sed
                  risus nisl tristique faucibus quis.{" "}
                </p>
              </div>
            </div>
            <div className="  col-xl-4 col-lg-4">
              <div className="card">
                <div className="d-flex" style={{ paddingBottom: "27px" }}>
                  <img src="/images/profile2.svg" alt="avatar" height="90px" width="90px" />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div style={{ paddingTop: "10px" }}>
                    <h4>Peter Patter</h4>
                    <p style={{ fontSize: "14px" }}>
                      Co-founder, PetaCare Inc.
                    </p>
                  </div>
                </div>
                <div className="d-flex" style={{ paddingBottom: "27px" }}>
                  <img src="/images/star.svg" alt="star" />
                  &nbsp;&nbsp;
                  <img src="/images/star.svg" alt="star" />
                  &nbsp;&nbsp;
                  <img src="/images/star.svg" alt="star" />
                  &nbsp;&nbsp;
                  <img src="/images/star.svg" alt="star" />
                  &nbsp;&nbsp;
                  <img src="/images/star.svg" alt="star" />
                  &nbsp;&nbsp;
                </div>
                <img src="images/quote.svg" alt="quote" height="18px" width="18px" />
                <p style={{ marginTop: "11px" }}>
                  Lorem ipsum dolor sit amet consectetur. Vulputate donec
                  egestas id commodo. Dis est mattis ac non aliquet donec. Sed
                  risus nisl tristique faucibus quis.{" "}
                </p>
              </div>
            </div>
            <div className="  col-xl-4 col-lg-4">
              <div className="card">
                <div className="d-flex" style={{ paddingBottom: "27px" }}>
                  <img src="/images/profile3.svg" alt="avatar" height="90px" width="90px" />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div style={{ paddingTop: "10px" }}>
                    <h4>Peter Patter</h4>
                    <p style={{ fontSize: "14px" }}>
                      Co-founder, PetaCare Inc.
                    </p>
                  </div>
                </div>
                <div className="d-flex" style={{ paddingBottom: "27px" }}>
                  <img src="/images/star.svg" alt="star"/>
                  &nbsp;&nbsp;
                  <img src="/images/star.svg" alt="star"/>
                  &nbsp;&nbsp;
                  <img src="/images/star.svg" alt="star"/>
                  &nbsp;&nbsp;
                  <img src="/images/star.svg" alt="star"/>
                  &nbsp;&nbsp;
                  <img src="/images/star.svg" alt="star"/>
                  &nbsp;&nbsp;
                </div>
                <img src="images/quote.svg" alt="quote" height="18px" width="18px" />
                <p style={{ marginTop: "11px" }}>
                  Lorem ipsum dolor sit amet consectetur. Vulputate donec
                  egestas id commodo. Dis est mattis ac non aliquet donec. Sed
                  risus nisl tristique faucibus quis.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer ">
          <div className=" footer-content row">
            <div className="col">
              <Link to="/">
                <img src="/images/pet-logo.svg" alt="petcare connect logo" width="134px" height="78px" />
              </Link>
            </div>
            <div className="col content">
              <h5>Account</h5>
              <ul id="menu-get-started" className="footer-menu-list">
                <li class="menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="/signup">Create an Account</a>
                </li>

                <li className="menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="/login">Login</a>
                </li>

                <li className="menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="/#">Customer Care</a>
                </li>
              </ul>
            </div>
            <div className="col content">
              <h5>Services</h5>
              <ul id="menu-get-started" className="footer-menu-list">
                <li class="menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="/find-provider">Find a pet care Provider</a>
                </li>

                <li className="menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="/booking">Book Appointment</a>
                </li>
              </ul>
            </div>
            <div className="col content">
              <h5>Company</h5>
              <ul id="menu-get-started" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="/about">About Us</a>
                </li>

                <li className="menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="/contact">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="foot">
            <div className="foot-items"></div>
            <div className="d-flex justify-content-between w-25 ">
              <p>Privacy Policy</p>
              <p>Terms and Condition</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
