import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="container-body">
      
      <div className="row">
      
        { 
            //  Image  
        }
        <div className="col-sm-5 d-none d-sm-block px-0">
          <img src="/images/woman-with-twodogs.jpg"
            alt="woman with two dogs" className="w-100 h-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
        </div>

            
        { 
            // SignUp Form 
        }
        <div className="col-sm-7 d-flex flex-column justify-content-center align-items-center">

          <div className='d-flex flex-row justify-content-center pt-5'>
            <a className="navbar-brand fw-bold text-center" href="home">
              <Link to="home">
                <img src="/images/pet-logo.svg" alt="petcareconnect logo" width="112px" height="72px" />
              </Link>
            </a>
          </div>

          <div className="d-flex flex-column justify-content-center h-custom-2 pt-5" style={{width: "90%"}}>

            <h5 className="fw-semibold mb-3 ps-5 pb-3">Let's get you started</h5>

            <form>
                <div className="mb-4 mx-5">

                  <p className="fw-normal">I am a:</p>

                  <div className="form-check form-check-inline me-5">
                    <input className="form-check-input" type="radio" name="userType" id="petownerID" value="petowner" checked/>
                    <label className="form-check-label" htmlFor="petownerID">Pet Owner</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="userType" id="serviceproviderID" value="serviceprovider"/>
                    <label className="form-check-label" htmlFor="serviceproviderID">Pet Care Provider</label>
                  </div>

                </div>

                <div className="d-flex flex-row mb-4 mx-5">
                    <div className="me-1">
                      <label htmlFor="first_name" className="form-label">First name</label>
                      <input type="text" className="form-control form-control-lg" id="first_name" required />
                    </div>
                    <div className="ms-1">
                      <label htmlFor="last_name" className="form-label">Last name</label>
                      <input type="text" className="form-control form-control-lg" id="last_name" required />
                    </div>
                </div>

                <div className="mb-4 mx-5">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control form-control-lg" id="email" required />
                </div>

                <div className="mb-4 mx-5">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control form-control-lg" id="password" required />
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

            <p className='fw-normal ms-5'>Already joined? 
                <a href="/login" className="ms-1" style={{color: "#157cff"}}>
                    Login to your account
                </a>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


export default Signup;