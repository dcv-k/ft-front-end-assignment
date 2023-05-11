// import { api } from "lib/axios";
import { api } from "config/fetch";
import { UNITS, API_KEY } from "constants";

export const getWeather = async (cityCode) => {
  return await api.get(
    `/weather?id=${cityCode}&units=${UNITS}&APPID=${API_KEY}`
  );
};
