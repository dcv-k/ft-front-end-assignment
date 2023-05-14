import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { UNITS, API_KEY } from "utils/constants";

import { useAPIHandler } from "utils/useAPIHandler";
import { useCacheHandler } from "utils/useCacheHandler";
import { useWeatherFormat } from "utils/useWeatherFormat";

const useWeather = (city, fresh) => {
  const { getWeather } = useAPIHandler();
  const { showBoundary } = useErrorBoundary();
  const { getCache, setCache } = useCacheHandler();
  const { formatWeatherData } = useWeatherFormat();
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (getCache(city) && !fresh) {
        setWeather(getCache(city));
      } else {
        try {
          let weather = await getWeather(city.CityCode, UNITS, API_KEY);
          weather = formatWeatherData(weather);
          setCache(city, weather);
          setWeather(weather);
        } catch (error) {
          showBoundary(error);
        }
      }
    };

    fetchWeather();
  }, [city, fresh]);

  return { weather, setWeather };
};

export { useWeather };
