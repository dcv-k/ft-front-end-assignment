import { useEffect, useState } from "react";
import useApiHandler from "hooks/useApiHandler";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import { LOCAL_URL, PATH_JSON, PATH_ERROR } from "constants";

const Dashboard = () => {
  const { error, apiHandler } = useApiHandler();
  const [cityList, setCityList] = useState(null);

  const getCityList = async (path) => {
    const response = await fetch(LOCAL_URL + path);
    if (!response.ok) {
      throw new Error(`Error status - ${response.status}`);
    }
    const { List } = await response.json();
    return List;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiHandler(getCityList, PATH_JSON);
      setCityList(data);
    };
    fetchData();
  }, []);

  const removeCity = (e, cityCode) => {
    e.stopPropagation();
    setCityList((prevCityList) =>
      prevCityList.filter(({ CityCode }) => CityCode !== String(cityCode))
    );
  };

  return (
    <>
      {error && (
        <div className="error">
          <div className="title">
            <img src={PATH_ERROR} alt="error"></img>
            <p className="text">Request Failed</p>
          </div>
          <p className="subtitle">
            Error occurred while fetching data from JSON file
          </p>
          <p className="message">{error.message}</p>
        </div>
      )}
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
