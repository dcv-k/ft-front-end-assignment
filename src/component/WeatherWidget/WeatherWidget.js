import "./WeatherWidget.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useApiHandler from "hooks/useApiHandler";
import { useCacheHandler } from "hooks/useCacheHandler";
import { useFlattenWeather } from "hooks/useFlattenWeather";
import { API_URL, API_KEY, UNITS, PATH_ERROR } from "constants";

const WeatherWidget = ({ city, removeCity, renderFreshData }) => {
  const [weather, setWeather] = useState(null);

  const navigate = useNavigate();
  const { flattenWeather } = useFlattenWeather();
  const { error, makeApiRequest } = useApiHandler();
  const { setCache, getCache, getMilliseconds } = useCacheHandler();
  const expireTime = getMilliseconds(city.ExpireTime, city.TimeUnit);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (freshData = false) => {
      if (!freshData && getCache(city)) {
        setWeather(getCache(city));
        console.log("Load weather from cache for: ", city.CityName);
      } else {
        const data = await getWeather(city.CityCode, UNITS, API_KEY);
        if (isMounted) {
          setWeather(data);
        }
        setCache(city.CityCode, data);
        console.log("Load weather from API for: ", city.CityName);
      }
    };
    fetchData();

    const i = setInterval(() => {
      fetchData(renderFreshData);
    }, expireTime);

    return () => {
      isMounted = false;
      setWeather(null);
      clearInterval(i);
    };
  }, []);

  const getWeather = async (id, units, apiKey) => {
    const data = await makeApiRequest(
      `${API_URL}/weather?id=${id}&units=${units}&APPID=${apiKey}`,
      { method: "GET" }
    );
    return flattenWeather(data);
  };

  const handleClick = (id) => {
    navigate(`/${id}`, { state: { cityCode: city.CityCode } });
  };

  const handleRemoveClick = (e, id) => {
    removeCity(e, id);
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
        <div
          className="weather-widget"
          onClick={() => {
            handleClick(weather.id);
          }}
        >
          <div className={weather.color + " top"}>
            <div className="remove">
              <img
                alt="close"
                onClick={(e) => {
                  handleRemoveClick(e, weather.id);
                }}
                className="icon--cross"
                src={weather.cross}
              />
            </div>
            <div className="content">
              <div className="left">
                <p className="city">
                  {weather.name},{weather.country}
                </p>
                <p>{weather.dateTime}</p>
                <div className="description">
                  <img
                    alt="weather"
                    className="icon--weather"
                    src={weather.icon}
                  />
                  <p className="description__text">{weather.description}</p>
                </div>
              </div>
              <div className="right">
                <p className="temperature">{weather.temperature} &deg;c</p>
                <p className="temperature-min">
                  Temp Min: {weather.minTemperature} &deg;c
                </p>
                <p className="temperature-max">
                  Temp Max: {weather.maxTemperature} &deg;c
                </p>
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
                {weather.speed} Km/s {weather.degree} Degree
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

export default WeatherWidget;
