import { api } from "lib/axios";
import { UNITS, API_KEY } from "config";

export const getWeather = (cityCode) => {
  return api.get(`/weather?id=${cityCode}&units=${UNITS}&APPID=${API_KEY}`);
};
