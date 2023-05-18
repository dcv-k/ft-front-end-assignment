import {
  UNITS,
  LOCAL_URL,
  PATH_ERROR,
  API_URL,
  API_KEY,
  PATH_JSON,
} from "constants";
import "./Details.css";
import { useEffect, useState } from "react";
import useApiHandler from "hooks/useApiHandler";
import { useWeatherFormat } from "hooks/useWeatherFormat";
import { useLocation, useNavigate } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [city, setCity] = useState();
  const [weather, setWeather] = useState();
  const { formatWeatherData } = useWeatherFormat();
  const { error, setError, apiHandler } = useApiHandler();

  // state was set in WeatherWidget onClick action
  const { cityCode } = location.state;

  // api request handling methods
  const getWeatherData = async (id, units, api_key) => {
    const response = await fetch(
      `${API_URL}/weather?id=${id}&units=${units}&APPID=${api_key}`
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching data : Error status - ${response.status}`
      );
    }
    let data = await response.json();
    data = formatWeatherData(data);
    return data;
  };

  const getCity = async (cityCode, path) => {
    const response = await fetch(LOCAL_URL + path);
    if (!response.ok) {
      throw new Error(`Error status - ${response.status}`);
    }
    const { List } = await response.json();
    return await List.find((city) => city.CityCode === cityCode);
  };

  // pass api request methods throught apiHandler and catch errors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const city = await apiHandler(getCity, cityCode, PATH_JSON);
        const data = await apiHandler(getWeatherData, cityCode, UNITS, API_KEY);
        setCity(city);
        setWeather(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

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
          <p className="city">City name : {city.CityName}</p>
        </div>
      )}
      {weather && (
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
