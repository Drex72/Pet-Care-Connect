import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/#">
          <Link to="/home">
            <img src="/images/pet-logo.svg" alt="petcareconnect logo" width="134px" height="78px" />
          </Link>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/#"
                style={{ paddingRight: "66px" }}
              >
                Home
              </a>
            </li>
            <li className="nav-item" style={{ paddingRight: "66px" }}>
              <a className="nav-link" href="/find-provider">
                Find a service provider
              </a>
            </li>
            <li className="nav-item" style={{ paddingRight: "66px" }}>
              <a className="nav-link"  href="/#">About Us</a>
            </li>

            <li className="nav-item" style={{ paddingRight: "66px" }}>
              <a className="nav-link"  href="/#">Contact Us</a>
            </li>
          </ul>
          <Link to="/signup">
            <button className="btn  fw-bold" type="submit">
              Login or Signup
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
