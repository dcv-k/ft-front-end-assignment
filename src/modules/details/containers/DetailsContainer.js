import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { getWeather } from "api/getWeather";
import { formatWeatherData } from "utils/formatWeatherData";
import Details from "../components/Details/Details";

const DetailsContainer = ({ cityCode }) => {
  const [weather, setWeather] = useState(null);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    console.log("use");
    async function fetchWeather(cityCode) {
      try {
        let weatherData = await getWeather(cityCode);

        weatherData = formatWeatherData(weatherData);
        setWeather(weatherData);
      } catch (error) {
        showBoundary(error);
      }
    }

    fetchWeather(cityCode);
  }, []);

  return <>{weather && <Details weather={weather} />}</>;
};

export default DetailsContainer;
