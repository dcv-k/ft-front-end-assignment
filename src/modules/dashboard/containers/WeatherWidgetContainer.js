import { useEffect, useState } from "react";
import { getWeather } from "api/getWeather";
import { getCache, setCache } from "utils/handleCache";
import WeatherWidget from "../components/WeatherWidget";
import { formatWeatherData } from "utils/formatWeatherData";

const WeatherWidgetContainer = ({ city, removeWidget }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather(city) {
      if (getCache(city)) {
        let weatherData = await getCache(city);
        setWeather(weatherData);
      } else {
        let weatherData = await getWeather(city.CityCode);

        weatherData = formatWeatherData(weatherData);

        setWeather(weatherData);
        setCache(city, weatherData);
      }
    }

    fetchWeather(city);
  });

  return (
    <>
      {weather && (
        <WeatherWidget weather={weather} removeWidget={removeWidget} />
      )}
    </>
  );
};

export default WeatherWidgetContainer;
