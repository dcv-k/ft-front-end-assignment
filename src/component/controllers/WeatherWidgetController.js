import { useContext, useEffect, useState } from "react";
import WeatherWidget from "component/views/WeatherWidget/WeatherWidget";
import { useNavigate } from "react-router-dom";
import { CityListContext } from "component/controllers/DashboardController";
import { WeatherModel } from "model/WeatherModel";
import { useErrorBoundary } from "react-error-boundary";

const WeatherWidgetController = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();
  const { cityList, setCityList } = useContext(CityListContext);
  const { showBoundary } = useErrorBoundary();

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
