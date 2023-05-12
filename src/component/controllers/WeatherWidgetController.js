import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { WeatherModel } from "model/WeatherModel";
import WeatherWidget from "component/views/WeatherWidget/WeatherWidget";
import { CityListContext } from "component/controllers/DashboardController";

const WeatherWidgetController = ({ city }) => {
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [weather, setWeather] = useState(null);
  const { cityList, setCityList } = useContext(CityListContext);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = new WeatherModel({ city });
        await data.componentDidMount();
        setWeather(data.state.weather);
      } catch (error) {
        showBoundary(error);
      }
    };

    fetchWeather();
  }, []);

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
