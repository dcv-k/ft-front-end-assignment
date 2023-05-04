import { formatTimeAndDate } from "./formatDateAndTime";
import { formatTime } from "./formatTime";
import { API_BASE_URL, IMG_URL_CROSS, IMG_URL_ARROWHEAD } from "config";

export const formatWeatherData = (weatherData) => {
  //create new object with only necessary properties
  weatherData.dt = formatTimeAndDate(weatherData.dt);
  weatherData.sys.sunrise = formatTime(weatherData.sys.sunrise);
  weatherData.sys.sunset = formatTime(weatherData.sys.sunset);
  weatherData.icon = `${API_BASE_URL}/img/wn/${weatherData.weather[0].icon}.png`;
  weatherData.description = weatherData.weather[0].description;
  weatherData.main.temp = Math.floor(weatherData.main.temp);
  weatherData.main.temp_max = Math.floor(weatherData.main.temp_max);
  weatherData.main.temp_min = Math.floor(weatherData.main.temp_min);
  weatherData.visibility = (weatherData.visibility / 1000).toFixed(1);
  weatherData.className =
    "w-" + weatherData.weather[0].description.split(" ").join("-") + " top";
  weatherData.crossImage = IMG_URL_CROSS;
  weatherData.arrowHeadImage = IMG_URL_ARROWHEAD;
  return weatherData;
};
