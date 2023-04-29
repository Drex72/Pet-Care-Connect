import MotivationImage from "../../assets/images/motivationimage.svg";
import { PetQuotes } from "../../data/petQuotes";
import Header from "../Header/Header";
import "./DashboardMotivationStyles.scss";

const DashboardMotivation = () => {
  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 47) + 1;
  };
  return (
    <div className="dashboard_motivation_container">
      <div>
        <Header message="Daily Motivation" color="#157cff" />
        <p className="dashboard_motivation_content">
          “{PetQuotes[generateRandomNumber()]}”
        </p>
      </div>
      <div className="dashboard_motivation_image_container">
        <img src={MotivationImage} alt="motivation" />
      </div>
    </div>
  );
};

export default DashboardMotivation;
