import React from "react";
import { Link } from "react-router-dom";

const AddPet = () => {
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
                Let's know more about your pet.
            </h5>

            <form>
                <div className="mb-4 mx-5">
                  <label htmlFor="species" className="form-label">Pet animal (Species)</label>
                  <input type="tel" className="form-control form-control-lg" id="species" placeholder="e.g Dog, cat" required />
                </div>

                <div className="d-flex flex-row mb-4 mx-5">
                    <div className="me-1">
                      <label htmlFor="name" className="form-label">Pet's name</label>
                      <input type="text" className="form-control form-control-lg" id="name" required />
                    </div>
                    <div className="ms-1">
                      <label htmlFor="breed" className="form-label">Breed</label>
                      <input type="text" className="form-control form-control-lg" id="breed" required />
                    </div>
                </div>              

                <div className="d-flex flex-row mb-4 mx-5">
                    <div className="me-1">
                      <label htmlFor="birth_date" className="form-label">Birthday</label>
                      <input type="date" className="form-control form-control-lg" id="birth_date" required />
                    </div>
                    <div className="ms-1">
                      <label htmlFor="gender" className="form-label">Gender</label>
                      <input type="text" className="form-control form-control-lg" id="gender" required />
                    </div>
                </div>

                <div className="mb-4 mx-5">
                  <label htmlFor="special_needs" className="form-label">Special needs</label>
                  <textarea className="form-control form-control-lg" id="special_needs" rows="2"> </textarea>
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
                      Add pet to your profile   ->
                </button>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
}


export default AddPet;