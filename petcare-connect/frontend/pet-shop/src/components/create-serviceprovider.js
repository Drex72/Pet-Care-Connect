import React from "react";
import { Link } from "react-router-dom";

const ServiceProviderSignup = () => {
  return (
    <div className="container-body">
      
      <div className="row">
      
        { 
            //  Image  
        }
        <div className="col-sm-5 d-none d-sm-block px-0">
          <img src="/images/basemap-image.jpg"
            alt="Map of Aberdeen" className="w-100" style={{objectFit: 'cover', objectPosition: 'left', height: "115vh"}} />
        </div>

            
        { 
            // Contact Form 
        }
        <div className="col-sm-7 d-flex flex-column align-items-center">

          <div className='d-flex flex-row justify-content-center pt-5 mt-3'>
            <a className="navbar-brand fw-bold text-center" href="home">
              <Link to="home">
                <img src="/images/pet-logo.svg" alt="petcareconnect logo" width="112px" height="72px" />
              </Link>
            </a>
          </div>

          <div className="d-flex flex-column justify-content-center h-custom-2 pt-5" style={{width: "90%"}}>

            <h5 className="fw-semibold mb-3 ps-5 pb-3">
                <span className="text-black-50 me-2">1/2</span>
                Making it easy for customers to reach you...
            </h5>

            <form>
                <div className="mb-4 mx-5">
                  <label htmlFor="phone_number" className="form-label">Phone number</label>
                  <input type="tel" className="form-control form-control-lg" id="phone_number" placeholder="+44..." required />
                </div>

                <div className="d-flex flex-row mb-4 mx-5">
                    <div className="me-1">
                      <label htmlFor="address_street" className="form-label">Street</label>
                      <input type="text" className="form-control form-control-lg" id="address_street" required />
                    </div>
                    <div className="ms-1">
                      <label htmlFor="address_city" className="form-label">City</label>
                      <input type="text" className="form-control form-control-lg" id="address_city" required />
                    </div>
                </div>              

                <div className="d-flex flex-row mb-4 mx-5">
                    <div className="me-1">
                      <label htmlFor="address_state" className="form-label">State</label>
                      <input type="text" className="form-control form-control-lg" id="address_state" required />
                    </div>
                    <div className="ms-1">
                      <label htmlFor="formControlLg" className="form-label">Postal code</label>
                      <input type="text" className="form-control form-control-lg" id="address_postalcode" required />
                    </div>
                </div>

                <button 
                  className="btn fw-bold mb-4 px-5 mx-5" 
                  type="submit"
                  style={{
                    borderRadius: "0",
                    height: "56px",
                    marginTop: "16px",
                    width: "-moz-available",
                    // eslint-disable-next-line
                    width: "-webkit-fill-available"
                  }}>
                      Continue   ->
                </button>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
}


export default ServiceProviderSignup;