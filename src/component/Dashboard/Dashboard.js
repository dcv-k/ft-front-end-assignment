import { useEffect, useState } from "react";
import useApiHandler from "hooks/useApiHandler";
import { LOCAL_URL, PATH_JSON } from "constants";
import WeatherWidget from "../WeatherWidget/WeatherWidget";

const Dashboard = () => {
  const { error, apiHandler } = useApiHandler();
  const [cityList, setCityList] = useState(null);

  const getCityList = async (path) => {
    const response = await fetch(LOCAL_URL + path);
    if (!response.ok) {
      throw new Error(
        `Error fetching data : Error status - ${response.status}`
      );
    }
    const { List } = await response.json();
    return List;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiHandler(getCityList, PATH_JSON);
        setCityList(data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const removeCity = (cityCode) => {};

  return (
    <>
      {error && <p>error!</p>}
      {cityList &&
        cityList.map((city) => (
          <WeatherWidget
            key={city.CityCode}
            city={city}
            removeCity={removeCity}
          />
        ))}
    </>
  );
};

export default Dashboard;
