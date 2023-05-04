import { formatTimeAndDate } from "./formatDateAndTime";
import { formatTime } from "./formatTime";

export const formatWeatherData = (weatherData) => {
  weatherData.dt = formatTimeAndDate(weatherData.dt);
  weatherData.sys.sunrise = formatTime(weatherData.sys.sunrise);
  weatherData.sys.sunset = formatTime(weatherData.sys.sunset);
  return weatherData;
};
