import { formatTimeAndDate } from "./formatDateAndTime";
import { formatTime } from "./formatTime";
import { API_BASE_URL, IMG_URL_CROSS, IMG_URL_ARROWHEAD } from "config";

export const formatWeatherData = ({
  id,
  name,
  country,
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
    time: formatTimeAndDate(dt),
    description: weather[0].description,
    sunrise: formatTime(sys.sunrise),
    sunset: formatTime(sys.sunset),
    icon: `${API_BASE_URL}/img/wn/${weather[0].icon}.png`,
    temperature: Math.floor(temp),
    maxTemperature: Math.floor(temp_max),
    minTemperature: Math.floor(temp_min),
    pressure,
    humidity,
    visibility: (visibility / 1000).toFixed(1),
    speed,
    degree: deg,
    cross: IMG_URL_CROSS,
    arrow: IMG_URL_ARROWHEAD,
  };
};
