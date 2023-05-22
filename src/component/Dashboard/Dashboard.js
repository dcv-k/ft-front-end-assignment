import { useEffect, useState } from "react";
import "./Dashboard.css";

import useApiHandler from "../../hooks/useApiHandler";
import WeatherWidget from "../WeatherWidget/WeatherWidget";

import { LOCAL_URL, PATH_JSON, PATH_ERROR } from "../../constants";

const Dashboard = () => {
  const [cities, setCities] = useState(null);
  const { error, apiHandler } = useApiHandler();

  useEffect(() => {
    let isMounted = false;

    const fetchData = async () => {
      const data = await apiHandler(getCities, PATH_JSON);
      if (!isMounted) {
        setCities(data);
      }
    };
    fetchData();

    return () => {
      isMounted = true;
    };
  }, []);

  const getCities = async (path) => {
    const response = await fetch(LOCAL_URL + path);
    if (!response.ok) {
      throw new Error(`Error status - ${response.status}`);
    }
    const { List } = await response.json();
    return List;
  };

  const removeCity = (e, cityCode) => {
    e.stopPropagation();
    setCities((prevCityList) =>
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
      <section>
        <div className="search">
          <input placeholder="Enter a city"></input>
          <button>Add City</button>
        </div>
      </section>

      <section className="widgets">
        {cities &&
          cities.map((city) => (
            <WeatherWidget
              key={city.CityCode}
              city={city}
              removeCity={removeCity}
            />
          ))}
      </section>
    </>
  );
};

export default Dashboard;
