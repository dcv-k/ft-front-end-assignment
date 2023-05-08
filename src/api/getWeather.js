// import { api } from "lib/axios";
import { api } from "lib/fetch";
import { UNITS, API_KEY } from "config";

export const getWeather = async (cityCode) => {
  return await api.get(
    `/weather?id=${cityCode}&units=${UNITS}&APPID=${API_KEY}`
  );
};
