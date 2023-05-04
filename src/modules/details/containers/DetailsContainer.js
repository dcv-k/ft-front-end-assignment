import { getWeather } from "api/getWeather";
import Details from "../components/Details";
import { useEffect, useState } from "react";
import { formatWeatherData } from "utils/formatWeatherData";

const DetailsContainer = ({ cityCode }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather(cityCode) {
      let weatherData = await getWeather(cityCode);

      weatherData = formatWeatherData(weatherData);
      setWeather(weatherData);
    }

    fetchWeather(cityCode);
  });

  return <>{weather && <Details weather={weather} />}</>;
};

export default DetailsContainer;
