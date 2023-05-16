import { useAPIHandler } from "./useAPIHandler";
import { PATH_JSON } from "constants";

const useCacheHandler = () => {
  const { getCity } = useAPIHandler();

  const timeToMilliseconds = (unit, time) => {
    if (unit === "MIN") {
      return time * 60 * 1000;
    } else if (unit === "SEC") {
      return time * 1000;
    } else {
      console.log("Unsupported time unit");
    }
  };

  const getCache = (city) => {
    const cacheCity = JSON.parse(localStorage.getItem(city.CityCode));
    // const cityNew = await getCity(city.CityCode, PATH_JSON);

    if (
      cacheCity &&
      Date.now() - cacheCity.cachedTime <
        timeToMilliseconds(city.ExpTimeUnit, city.ExpTime)
    ) {
      return cacheCity.data;
    }
  };

  const setCache = (city, weather) => {
    localStorage.setItem(
      city.CityCode,
      JSON.stringify({ data: weather, cachedTime: Date.now() })
    );
  };

  return { getCache, setCache };
};

export { useCacheHandler };
