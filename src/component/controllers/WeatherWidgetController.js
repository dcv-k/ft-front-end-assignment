import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import WeatherWidget from "../views/WeatherWidget/WeatherWidget";
import { CityListContext } from "./DashboardController";
import { useWeather } from "../../model/useWeather";

const WeatherWidgetController = ({ city }) => {
  const navigate = useNavigate();
  const { weather } = useWeather(city);
  const { cityList, setCityList } = useContext(CityListContext);

  const handleClick = () => {
    navigate(`/${weather.id}`, { state: { city } });
  };

  const handleRemoveClick = (e) => {
    setCityList(
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
