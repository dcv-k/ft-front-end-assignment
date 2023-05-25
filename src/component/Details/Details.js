import { UNITS, PATH_ERROR, API_URL, API_KEY } from "constants";
import "./Details.css";
import { useEffect, useState } from "react";
import { useFlattenWeather } from "hooks/useFlattenWeather";
import { useLocation, useNavigate } from "react-router-dom";
import useApiHandler from "hooks/useApiHandler";

const Details = () => {
  const [weather, setWeather] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const { cityCode } = location.state;
  const { flattenWeather } = useFlattenWeather();
  const { error, makeApiRequest } = useApiHandler();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const data = await getWeather(cityCode, UNITS, API_KEY);
      if (isMounted) {
        setWeather(data);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const getWeather = async (id, units, apiKey) => {
    const data = await makeApiRequest(
      `${API_URL}/weather?id=${id}&units=${units}&APPID=${apiKey}`,
      { method: "GET" }
    );
    return flattenWeather(data);
  };

  const handleBackClick = () => {
    navigate("/");
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
            Error occurred while fetching data from OpenWeatherMap API
          </p>
          <p className="message">{error.message}</p>
        </div>
      )}
      {weather && !error && (
        <div className="weather-details">
          <div className={weather.color + " top"}>
            <div className="btn-back" onClick={handleBackClick}>
              <img alt="weather" className="icon--back" src={weather.back} />
            </div>
            <div className="content">
              <div className="center">
                <p className="city">
                  {weather.name},{weather.country}
                </p>
                <p>{weather.dateTime}</p>
              </div>
              <div className="row">
                <div className="left">
                  <img
                    alt="weather"
                    className="icon--weather"
                    src={weather.icon}
                  />
                  <p className="description">{weather.description}</p>
                </div>
                <div className="right">
                  <p className="temperature">{weather.temperature} &deg;c</p>
                  <p className="temperature-max">
                    Temp Min: {weather.minTemperature} &deg;c
                  </p>
                  <p className="temperature-min">
                    Temp Max: {weather.maxTemperature} &deg;c
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="left">
              <p>Pressure: {weather.pressure}hPa</p>
              <p>Humidity: {weather.humidity}%</p>
              <p>Visibility: {weather.visibility}Km</p>
            </div>
            <div className="center">
              <img alt="arrow" className="icon--arrow" src={weather.arrow} />
              <p>
                {weather.speed}Km/s {weather.degree}Degree
              </p>
            </div>
            <div className="right">
              <p>Sunrise: {weather.sunrise}</p>
              <p>Sunset: {weather.sunset}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
