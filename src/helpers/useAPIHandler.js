import { API_URL, LOCAL_URL } from "../constants";

const useAPIHandler = () => {
  const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        `Error fetching data : Error status - ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  };

  const getCities = async (path) => {
    return await fetchData(LOCAL_URL + path);
  };

  const getCity = async (cityCode, path) => {
    const { List } = await fetchData(LOCAL_URL + path);
    return List.find((city) => city.CityCode === cityCode);
  };

  const getWeather = async (id, units, api_key) => {
    return await fetchData(
      `${API_URL}/weather?id=${id}&units=${units}&APPID=${api_key}`
    );
  };

  return { getCities, getCity, getWeather };
};

export { useAPIHandler };
