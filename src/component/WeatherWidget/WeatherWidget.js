import "./WeatherWidget.css";
import { UNITS } from "constants";
import { useEffect, useState } from "react";
import { API_URL, API_KEY, PATH_ERROR } from "constants";
import { useNavigate } from "react-router-dom";
import useApiHandler from "hooks/useApiHandler";
import { useCacheHandler } from "hooks/useCacheHandler";
import { useWeatherFormat } from "hooks/useWeatherFormat";

const WeatherWidget = ({ city, removeCity }) => {
  const navigate = useNavigate();
  const { error, apiHandler, setError } = useApiHandler();
  const [weather, setWeather] = useState(null);
  const { formatWeatherData } = useWeatherFormat();
  const { setCache, getCache, timeToMilliseconds } = useCacheHandler();

  const getWeatherData = async (id, units, api_key) => {
    const response = await fetch(
      `${API_URL}/weather?id=${id}&units=${units}&APPID=${api_key}`
    );
    if (!response.ok) {
      throw new Error(`API Error : Error status - ${response.status}`);
    }
    let data = await response.json();
    data = formatWeatherData(data);
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (getCache(city)) {
        setWeather(getCache(city));
        console.log("Load weather from cache for: ", city.CityName);
      } else {
        try {
          const data = await apiHandler(
            getWeatherData,
            city.CityCode,
            UNITS,
            API_KEY
          );
          setWeather(data);
          setCache(city.CityCode, data);
          console.log("Load weather from API for: ", city.CityName);
        } catch (error) {
          setError(error);
        }
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, timeToMilliseconds(city.ExpTimeUnit, city.ExpTime));

    return () => {
      clearInterval(interval);
    };
  }, []);

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
          <p className="city">City name : {city.CityName}</p>
        </div>
      )}
      {weather && (
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
