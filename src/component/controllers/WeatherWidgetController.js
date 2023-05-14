import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import WeatherWidget from "component/views/WeatherWidget/WeatherWidget";
import { CityListContext } from "component/controllers/DashboardController";
import { useWeather } from "model/useWeather";

const WeatherWidgetController = ({ city }) => {
  const navigate = useNavigate();
  const { cityList, setCityList } = useContext(CityListContext);
  const { weather } = useWeather(city);

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
