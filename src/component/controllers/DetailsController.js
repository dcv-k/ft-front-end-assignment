import { useLocation, useNavigate } from "react-router-dom";

import Details from "../views/Details/Details";
import { useWeather } from "../../model/useWeather";

const DetailsController = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // get clicked city object and using that object to get fresh weather data
  const { city } = location.state;
  const getFreshData = true;
  const { weather } = useWeather(city, getFreshData);

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <>
      {weather && (
        <Details weather={weather} handleBackClick={handleBackClick} />
      )}
    </>
  );
};

export default DetailsController;
