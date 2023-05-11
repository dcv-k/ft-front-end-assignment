// import { local } from "lib/axios";
import { local } from "api-config/fetch";

export const getCities = () => {
  return local.get("/data/cities.json");
};
