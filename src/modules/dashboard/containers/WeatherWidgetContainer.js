import { useEffect, useState } from "react";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";

import { getWeather } from "api/getWeather";
import { getCache, setCache } from "utils/handleCache";
import WeatherWidget from "../components/WeatherWidget";
import ErrorFallback from "components/error/ErrorFallback";
import { formatWeatherData } from "utils/formatWeatherData";

const WeatherWidgetContainer = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    async function fetchWeather(city) {
      if (getCache(city)) {
        // get cache data if available
        try {
          let weatherData = await getCache(city);
          setWeather(weatherData);
        } catch (error) {
          showBoundary(error);
        }
      } else {
        try {
          // make new API calls
          let weatherData = await getWeather(city.CityCode);
          console.log(weatherData);
          weatherData = formatWeatherData(weatherData);
          // set new cache data
          setCache(city, weatherData);
          setWeather(weatherData);
        } catch (error) {
          showBoundary(error);
        }
      }
    }

    fetchWeather(city);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {weather && <WeatherWidget weather={weather} />}
    </ErrorBoundary>
  );
};

export default WeatherWidgetContainer;
