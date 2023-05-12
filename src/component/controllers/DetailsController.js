import Details from "component/views/Details/Details";
import { WeatherModel } from "model/WeatherModel";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const DetailsController = () => {
  const location = useLocation();
  const { city } = location.state;

  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = new WeatherModel({ city, fresh: true });
        await data.componentDidMount();
        setWeather(data.state.weather);
      } catch (error) {
        console.log("dashboard", error);
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
