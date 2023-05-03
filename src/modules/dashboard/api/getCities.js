import { local } from "lib/axios";

export const getCities = () => {
  return local.get("/data/cities.json");
};
