import Details from "component/views/Details/Details";
import WeatherModel from "model/WeatherModel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DetailsController = () => {
  const { id } = useParams();
  const [weather, setWeather] = useState[null];
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const data = WeatherModel();
      setWeather(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

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
