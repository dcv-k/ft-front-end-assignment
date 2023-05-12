import { api } from "config/fetch";
import { API_KEY } from "constants";
import { UNITS } from "constants";
import { useState } from "react";

export default WeatherModel = ({ city }) => {
  const [weather, setWeather] = useState(null);

  if (getCache(city)) {
    let data = getCache(city);
    setWeather(data);
  } else {
    let data = getWeather(city.CityCode);
    data = formatWeatherData(data);
    setWeather(data);
  }

  return {
    weather,
  };
};

const getWeather = async (id) => {
  return await api.get(`/weather?id=${id}&units=${UNITS}&APPID=${API_KEY}`);
};

const formatWeatherData = ({
  id,
  name,
  sys: { country },
  dt,
  weather,
  sys,
  main: { temp, temp_min, temp_max, pressure, humidity },
  visibility,
  wind: { speed, deg },
}) => {
  return {
    id,
    color: `w-${weather[0].description.split(" ").join("-")}`,
    name,
    country,
    dateTime: formatTimeAndDate(dt),
    description: weather[0].description,
    sunrise: formatTime(sys.sunrise),
    sunset: formatTime(sys.sunset),
    icon: `${API_PROVIDER}/img/wn/${weather[0].icon}.png`,
    temperature: Math.floor(temp),
    maxTemperature: Math.floor(temp_max),
    minTemperature: Math.floor(temp_min),
    pressure,
    humidity,
    visibility: (visibility / 1000).toFixed(1),
    speed,
    degree: deg,
    cross: PATH_CROSS,
    arrow: PATH_ARROWHEAD,
    back: PATH_BACK,
  };
};

const formatTimeAndDate = (time) => {
  return (
    new Date(time * 1000).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }) +
    ", " +
    new Date(time * 1000).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    })
  );
};

const formatTime = (time) => {
  return new Date(time * 1000).toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
};

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
