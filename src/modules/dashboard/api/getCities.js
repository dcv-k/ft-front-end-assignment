// import { local } from "lib/axios";
import { local } from "lib/fetch";

export const getCities = () => {
  return local.get("/data/cities.json");
};
