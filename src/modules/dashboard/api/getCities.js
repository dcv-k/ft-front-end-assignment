// import { local } from "lib/axios";
import { local } from "config/fetch";
import { PATH_JSON } from "constants";

export const getCities = () => {
  return local.get(PATH_JSON);
};
