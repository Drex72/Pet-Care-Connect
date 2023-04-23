import Navbar from "./navbar";
import React from "react";
//import { Link } from "react-router-dom";



const FindProvider = () => {
  return (
    <div className="care-provider">
      <Navbar />
      <div className="search-wrapper row">
        <div className="col">
          <div className="d-flex">
            <div className="search-input">
              <label class="custom-field three">
                <input type="text" />
                <span class="placeholder">Search</span>
                <span class="border"></span>
              </label>
            </div>
            <div className="search-btn">
              <img src="/images/search.svg" alt="search"/>
            </div>
          </div>

          <p style={{ fontWeight: "500", marginTop: "5px" }}>10 results </p>

          <span
            style={{ color: "#646464", fontWeight: "700", fontSize: "24px" }}
          >
            Results around &nbsp;
          </span>
          <span style={{ fontWeight: "700", fontSize: "24px" }}>
            Aberden, Scotland
          </span>

          <div
            className="d-flex justify-content-between"
            style={{ paddingTop: "26px", paddingBottom: "53px" }}
          >
            <div className="f">
              <div className="pills row gx-2">
                <div className="pill-1 col" style={{ marginRight: "5px" }}>
                  <h6 className="child">Pet walking</h6>
                </div>
                <div className="pill-1 col" style={{ marginRight: "5px" }}>
                  <h6 className="child">Dog training</h6>
                </div>
                <div className="pill-2 col">
                  <h6 className="child">Pet grooming</h6>
                </div>
              </div>
            </div>
            <div className="f">
              <div className="d-flex">
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "12px",
                    marginTop: "5px",
                  }}
                >
                  Sort by: &nbsp;
                </div>{" "}
                <div>
                  <ul style={{ padding: "0", listStyle: "none" }}>
                    <li class="nav-item dropdown">
                      <a
                        class="nav-link dropdown-toggle"
                        href="/#"
                        id="navbarDropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Distance
                      </a>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <a class="dropdown-item" href="/#">
                          Action
                        </a>
                        <a class="dropdown-item" href="/#">
                          Another action
                        </a>
                        <a class="dropdown-item" href="/#">
                          Something else here
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content d-flex">
              <img src="/images/image 1.svg" alt="avatar" />
              <div className="right" style={{ marginLeft: "15px" }}>
                <div className="d-flex justify-content-between">
                  <div className="x">
                    <p>38, John St, AB25 1LL, Aberdeen, Scotland</p>
                  </div>
                  <div className="x">
                    <p>3.4km away</p>
                  </div>
                </div>
                <h5>John Doe</h5>
                <div
                  className="d"
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  <span>Pet Walking</span>&nbsp;&nbsp;
                  <span>
                    <img src="/images/bullet.svg" alt="bullet"/>
                    &nbsp; Dog training
                  </span>
                  &nbsp;&nbsp;
                  <span>
                    {" "}
                    <img src="/images/bullet.svg" alt="bullet"/>
                    &nbsp; Pet Sitting
                  </span>
                </div>
                <div style={{ paddingTop: "12px" }}>
                  <div className="d-flex justify-content-between">
                    <div className="left">
                      <div className="d-flex">
                        <span style={{ fontWeight: "700" }}>4.6</span>
                        <img src="/images/Star.svg" alt="star" />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span
                          style={{
                            fontWeight: "700",
                            textDecoration: "underline",
                          }}
                        >
                          28 Reviews
                        </span>
                      </div>
                    </div>
                    <div className="right">
                      <button
                        className="btn  fw-bold"
                        type="submit"
                        style={{ fontWeight: "500", fontSize: "12px" }}
                      >
                        View Profile <img src="/images/Right.svg" alt="right" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content d-flex">
              <img src="/images/image2.svg" alt="avatar" />
              <div className="right" style={{ marginLeft: "15px" }}>
                <div className="d-flex justify-content-between">
                  <div className="x">
                    <p>38, John St, AB25 1LL, Aberdeen, Scotland</p>
                  </div>
                  <div className="x">
                    <p>3.4km away</p>
                  </div>
                </div>
                <h5>Davey Rollade</h5>
                <div
                  className="d"
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  <span>Pet Walking</span>&nbsp;&nbsp;
                  <span>
                    <img src="/images/bullet.svg" alt="bullet"/>
                    &nbsp; Dog training
                  </span>
                  &nbsp;&nbsp;
                  <span>
                    {" "}
                    <img src="/images/bullet.svg" alt="bullet"/>
                    &nbsp; Pet Sitting
                  </span>
                </div>
                <div style={{ paddingTop: "12px" }}>
                  <div className="d-flex justify-content-between">
                    <div className="left">
                      <div className="d-flex">
                        <span style={{ fontWeight: "700" }}>4.6</span>
                        <img src="/images/Star.svg" alt="star" />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span
                          style={{
                            fontWeight: "700",
                            textDecoration: "underline",
                          }}
                        >
                          28 Reviews
                        </span>
                      </div>
                    </div>
                    <div className="right">
                      <button
                        className="btn  fw-bold"
                        type="submit"
                        style={{ fontWeight: "500", fontSize: "12px" }}
                      >
                        View Profile <img src="/images/Right.svg" alt="right" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content d-flex">
              <img src="/images/image3.svg" alt="avatar" />
              <div className="right" style={{ marginLeft: "15px" }}>
                <div className="d-flex justify-content-between">
                  <div className="x">
                    <p>38, John St, AB25 1LL, Aberdeen, Scotland</p>
                  </div>
                  <div className="x">
                    <p>3.4km away</p>
                  </div>
                </div>
                <h5>Ann Example</h5>
                <div
                  className="d"
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  <span>Pet Walking</span>&nbsp;&nbsp;
                  <span>
                    <img src="/images/bullet.svg" alt="bullet" />
                    &nbsp; Dog training
                  </span>
                  &nbsp;&nbsp;
                  <span>
                    {" "}
                    <img src="/images/bullet.svg" alt="bullet" />
                    &nbsp; Pet Sitting
                  </span>
                </div>
                <div style={{ paddingTop: "12px" }}>
                  <div className="d-flex justify-content-between">
                    <div className="left">
                      <div className="d-flex">
                        <span style={{ fontWeight: "700" }}>4.6</span>
                        <img src="/images/Star.svg" alt="star" />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span
                          style={{
                            fontWeight: "700",
                            textDecoration: "underline",
                          }}
                        >
                          28 Reviews
                        </span>
                      </div>
                    </div>
                    <div className="right">
                      <button
                        className="btn  fw-bold"
                        type="submit"
                        style={{ fontWeight: "500", fontSize: "12px" }}
                      >
                        View Profile <img src="/images/Right.svg" alt="right" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="map">
            <img src="/images/map.svg" width="100%" height="1024px" alt="map"/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FindProvider;
