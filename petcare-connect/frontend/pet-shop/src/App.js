import "./App.scss";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/signup";
import PetOwnerSignup from "./components/create-petowner";
import ServiceProviderSignup from "./components/create-serviceprovider";
import AddPet from "./components/add-pet";
import AddService from "./components/add-service";
import Login from "./components/login";
import FindProvider from "./components/find-provider";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="create-petowner" element={<PetOwnerSignup />} />
        <Route path="create-serviceprovider" element={<ServiceProviderSignup />} />
        <Route path="add-pet" element={<AddPet />} />
        <Route path="add-service" element={<AddService />} />
        <Route path="find-provider" element={<FindProvider />} />
      </Routes>
    </div>
  );
};
export default App;
