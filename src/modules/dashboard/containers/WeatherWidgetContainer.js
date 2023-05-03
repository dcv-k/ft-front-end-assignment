import { useEffect, useState } from "react";
import { getWeather } from "api/getWeather";
import { formatTimeAndDate } from "utils/formatDateAndTime";
import { formatTime } from "utils/formatTime";
import { getCache, setCache } from "utils/handleCache";
import WeatherWidget from "../components/WeatherWidget";

const WeatherWidgetContainer = ({ city, removeWidget }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather(city) {
      if (getCache(city)) {
        const weatherData = await getCache(city);
        setWeather(weatherData);
      } else {
        const weatherData = await getWeather(city.CityCode);

        weatherData.dt = formatTimeAndDate(weatherData.dt);
        weatherData.sys.sunrise = formatTime(weatherData.sys.sunrise);
        weatherData.sys.sunset = formatTime(weatherData.sys.sunset);

        setCache(city, weatherData);
        setWeather(weatherData);
      }
    }

    fetchWeather(city);
  }, []);

  return (
    <>
      {weather && (
        <WeatherWidget weather={weather} removeWidget={removeWidget} />
      )}
    </>
  );
};

export default WeatherWidgetContainer;
