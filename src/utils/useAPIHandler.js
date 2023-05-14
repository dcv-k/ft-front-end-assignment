import { API_URL, LOCAL_URL } from "./constants";

const useAPIHandler = () => {
  const local = {
    get: async (url, options) => {
      const response = await fetch(LOCAL_URL + url, options);
      if (!response.ok) {
        throw new Error(
          `Error fetching data from JSON file: Error status - ${response.status}`
        );
      }
      const data = await response.json();
      return data;
    },
  };

  const api = {
    get: async (url, options) => {
      const response = await fetch(API_URL + url, options);
      if (!response.ok) {
        throw new Error(
          `Error fetching data from Weather API: Error status - ${response.status}`
        );
      }
      const data = await response.json();
      return data;
    },
  };

  const getCities = async (path) => {
    return await local.get(path);
  };

  const getWeather = async (id, units, api_key) => {
    return await api.get(`/weather?id=${id}&units=${units}&APPID=${api_key}`);
  };

  return { getCities, getWeather };
};

export { useAPIHandler };
