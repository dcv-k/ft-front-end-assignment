import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { UNITS, API_KEY } from "constants";

import { useWeatherFormat } from "../helpers/useWeatherFormat";
import { useCacheHandler } from "../helpers/useCacheHandler";
import { useAPIHandler } from "../helpers/useAPIHandler";

const useWeather = (city, fresh) => {
  const { getWeather } = useAPIHandler();
  const { getCache, setCache } = useCacheHandler();
  const { formatWeatherData } = useWeatherFormat();
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (getCache(city) && !fresh) {
        setWeather(getCache(city));
        console.log("Load weather from cache for: ", city.CityName);
      } else {
        try {
          let weather = await getWeather(city.CityCode, UNITS, API_KEY);
          weather = formatWeatherData(weather);
          setCache(city, weather);
          setWeather(weather);
          console.log("Load weather from API for: ", city.CityName);
        } catch (error) {}
      }
    };

    fetchWeather();
  }, [city, fresh]);

  return { weather, setWeather };
};

export { useWeather };
