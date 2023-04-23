import React from "react";
import { Link } from "react-router-dom";

const AddService = () => {
  return (
    <div className="container-body">
      
      <div className="row">
      
        { 
            //  Image  
        }
        <div className="col-sm-5 d-none d-sm-block px-0">
          <img src="/images/hifive-with-dog.jpg"
            alt="Hifive with a dog" className="w-100 h-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
        </div>

            
        { 
            // Add a pet Form 
        }
        <div className="col-sm-7 d-flex pb-5 flex-column align-items-center">

          <div className='d-flex flex-row justify-content-center pt-5 mt-3'>
            <a className="navbar-brand fw-bold text-center" href="home">
              <Link to="home">
                <img src="/images/pet-logo.svg" alt="petcareconnect logo" width="112px" height="72px" />
              </Link>
            </a>
          </div>

          <div className="d-flex flex-column justify-content-center h-custom-2 pt-5" style={{width: "90%"}}>

            <h5 className="fw-semibold mb-3 ps-5 pb-3">
                <span className="text-black-50 me-2">2/2</span>
                Let's know more about your service.
            </h5>

            <form>
                <div className="mb-4 mx-5">
                  <label htmlFor="name" className="form-label">Service name</label>
                  <input type="tel" className="form-control form-control-lg" id="species" placeholder="e.g Pet sitting" required />
                </div>

                <div className="mb-4 mx-5">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control form-control-lg" id="description" rows="3" required></textarea>
                </div>

                <div className="mb-4 mx-5">
                  <label htmlFor="price" className="form-label">Price per hour (£)</label>
                  <input type="number" step="0.01" className="form-control form-control-lg" id="price" required />
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
                      Add service to your profile   ->
                </button>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
}


export default AddService;