import React from "react";
import { Link } from "react-router-dom";


const Login = () => {
  return (
    <div className="container-body">
      
      <div className="row">

        <div className="col-sm-6">

          <div className='d-flex flex-row justify-content-center pt-5'>
            <a className="navbar-brand fw-bold text-center" href="home">
              <Link to="home">
                <img src="/images/pet-logo.svg" alt="petcareconnect logo" width="112px" height="72px" />
              </Link>
            </a>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-5'>

            <h5 className="fw-semibold mb-3 ps-5 pb-3">Welcome back!</h5>

            <div className="mb-4 mx-5 w-100">
              <label htmlFor="formControlLg" className="form-label">Email address</label>
              <input type="email" className="form-control form-control-lg" id="formControlLg"/>
            </div>

            <div className="mb-4 mx-5 w-100">
              <label htmlFor="formControlLg" className="form-label">Password</label>
              <input type="password" className="form-control form-control-lg" id="formControlLg"/>
            </div>

            <button 
              className="btn fw-bold mb-4 px-5 mx-5 w-100" 
              type="submit"
              style={{
                borderRadius: "0",
                width: "300px",
                height: "56px",
                marginTop: "16px",
              }}>
                  Log in   ->
            </button>
            <p className='fw-normal ms-5'>Getting started? 
                <a href="signup" className="ms-1" style={{color: "#157cff"}}>
                    Create an account
                </a>
            </p>

          </div>

        </div>

        <div className="col-sm-6 d-none d-sm-block px-0"  style={{height: '100vh'}}>
          <img src="/images/dog-walking.jpg"
            alt="A dog walker with dog" className="w-100 h-100" style={{objectFit: 'cover', objectPosition: 'right'}} />
        </div>

      </div>

    </div>
  );
}

export default Login;









