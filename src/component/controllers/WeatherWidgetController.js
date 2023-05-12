import { useContext, useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import WeatherWidget from "../components/WeatherWidget/WeatherWidget";
import WeatherModel from "model/WeatherModel";
import { useNavigate } from "react-router-dom";
import { CityListContext } from "component/controllers/DashboardController";

const WeatherWidgetController = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();
  const { cityList } = useContext(CityListContext);

  useEffect(() => {
    try {
      const data = WeatherModel(city);
      setWeather(data);
    } catch (error) {
      console.log("widget controller", error);
    }
  }, []);

  const handleClick = () => {
    navigate(`${weather.id}`);
  };

  const handleRemoveClick = () => {
    console.log("remove");
    setCities(
      cityList.filter(({ CityCode }) => CityCode !== String(weather.id))
    );
    e.stopPropagation();
  };

  return (
    <>
      {weather && (
        <WeatherWidget
          weather={weather}
          handleClick={handleClick}
          handleRemoveClick={handleRemoveClick}
        />
      )}
    </>
  );
};

export default WeatherWidgetController;
