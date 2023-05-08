import { getWeather } from "api/getWeather";
import Details from "../components/Details";
import { useEffect, useState } from "react";
import { formatWeatherData } from "utils/formatWeatherData";
import { useErrorBoundary } from "react-error-boundary";

const DetailsContainer = ({ cityCode }) => {
  const [weather, setWeather] = useState(null);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
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
  });

  return <>{weather && <Details weather={weather} />}</>;
};

export default DetailsContainer;
