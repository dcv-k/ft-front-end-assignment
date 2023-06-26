import { useEffect, useState } from "react";

import "./Dashboard.css";
import useApiHandler from "hooks/useApiHandler";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import { JSON_URL, PATH_ERROR } from "../../constants";
import LogoutButton from "component/LogoutButton/LogoutButton";

const Dashboard = () => {
  const renderFreshData = true;
  const [cities, setCities] = useState(null);
  const { error, makeApiRequest } = useApiHandler();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const data = await getCities(JSON_URL);
      if (isMounted) {
        setCities(data);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const getCities = async (path) => {
    const { List } = await makeApiRequest(path, { method: "GET" });
    return List;
  };

  const removeCity = (e, cityCode) => {
    e.stopPropagation();
    setCities((prevCities) =>
      prevCities.filter(({ CityCode }) => CityCode !== String(cityCode))
    );
  };

  return (
    <>
      <section>
        <div className="search">
          <input placeholder="Enter a city"></input>
          <button>Add City</button>
        </div>
      </section>

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

      <section className="widgets">
        {!error &&
          cities &&
          cities.map((city) => (
            <WeatherWidget
              key={city.CityCode}
              city={city}
              removeCity={removeCity}
              renderFreshData={renderFreshData}
            />
          ))}
      </section>
    </>
  );
};

export default Dashboard;
