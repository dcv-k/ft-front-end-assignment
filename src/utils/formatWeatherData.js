import { formatTimeAndDate } from "./formatDateAndTime";
import { formatTime } from "./formatTime";
import { API_PROVIDER, PATH_CROSS, PATH_ARROWHEAD, PATH_BACK } from "constants";

export const formatWeatherData = ({
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
