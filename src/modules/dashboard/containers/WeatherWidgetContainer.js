import { useEffect, useState } from "react";
import { getWeather } from "api/getWeather";
import { getCache, setCache } from "utils/handleCache";
import WeatherWidget from "../components/WeatherWidget";
import { formatWeatherData } from "utils/formatWeatherData";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import ErrorFallback from "components/error/ErrorFallback";

const WeatherWidgetContainer = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    async function fetchWeather(city) {
      if (getCache(city)) {
        let weatherData = await getCache(city);
        setWeather(weatherData);
      } else {
        try {
          let weatherData = await getWeather(city.CityCode);
          weatherData = formatWeatherData(weatherData);
          setCache(city, weatherData);
          setWeather(weatherData);
        } catch (error) {
          console.log(error);
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
