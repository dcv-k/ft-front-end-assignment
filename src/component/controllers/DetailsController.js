import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useLocation, useNavigate } from "react-router-dom";

import { WeatherModel } from "model/WeatherModel";
import Details from "component/views/Details/Details";

const DetailsController = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const { city } = location.state;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = new WeatherModel({ city, fresh: true });
        await data.componentDidMount();
        setWeather(data.state.weather);
      } catch (error) {
        showBoundary(error);
      }
    };

    fetchWeather();
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
