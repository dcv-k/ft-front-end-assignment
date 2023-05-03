import { timeToMilliseconds } from "./timeToMilliseconds";

export const getCache = (city) => {
  const cacheCity = JSON.parse(localStorage.getItem(city.CityCode));

  if (
    cacheCity &&
    Date.now() - cacheCity.cachedTime <
      timeToMilliseconds(city.ExpTimeUnit, city.ExpTime)
  ) {
    return cacheCity.data;
  }
};

export const setCache = (city, weather) => {
  localStorage.setItem(
    city.CityCode,
    JSON.stringify({ data: weather, cachedTime: Date.now() })
  );
};
