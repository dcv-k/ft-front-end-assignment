import { useNavigate } from "react-router-dom";
import "./WeatherWidget.css";
import { API_URL } from "constants";
import { useEffect, useState } from "react";
import useApiHandler from "hooks/useApiHandler";
import { UNITS } from "constants";
import { API_KEY } from "constants";
import { useCacheHandler } from "hooks/useCacheHandler";
import { useWeatherFormat } from "hooks/useWeatherFormat";

const WeatherWidget = ({ city, removeCity }) => {
  const navigate = useNavigate();
  const { formatWeatherData } = useWeatherFormat();
  const [weather, setWeather] = useState(null);
  const { error, apiHandler } = useApiHandler();
  const { setCache, getCache } = useCacheHandler();

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
          setCache(city.CityCode, data);
          setWeather(data);
          console.log("Load weather from API for: ", city.CityName);
        } catch (error) {}
      }
    };

    fetchData();
  }, []);

  const handleClick = (id) => {
    navigate(`/${id}`, { state: { cityCode: city.CityCode } });
  };

  const handleRemoveClick = (id) => {
    removeCity(id);
  };

  const {
    id,
    color,
    name,
    country,
    dateTime,
    icon,
    description,
    temperature,
    minTemperature,
    maxTemperature,
    humidity,
    pressure,
    visibility,
    speed,
    degree,
    sunrise,
    sunset,
    cross,
    arrow,
  } = weather || {};

  return (
    <>
      {error && <p>error!</p>}
      <div
        className="weather-widget"
        onClick={() => {
          handleClick(id);
        }}
      >
        <div className={color + " top"}>
          <div className="remove">
            <img
              alt="close"
              onClick={() => {
                handleRemoveClick(id);
              }}
              className="icon--cross"
              src={cross}
            />
          </div>
          <div className="content">
            <div className="left">
              <p className="city">
                {name},{country}
              </p>
              <p>{dateTime}</p>
              <div className="description">
                <img alt="weather" className="icon--weather" src={icon} />
                <p className="description__text">{description}</p>
              </div>
            </div>
            <div className="right">
              <p className="temperature">{temperature} &deg;c</p>
              <p className="temperature-min">
                Temp Min: {minTemperature} &deg;c
              </p>
              <p className="temperature-max">
                Temp Max: {maxTemperature} &deg;c
              </p>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <p>Pressure: {pressure}hPa</p>
            <p>Humidity: {humidity}%</p>
            <p>Visibility: {visibility}Km</p>
          </div>
          <div className="center">
            <img alt="arrow" className="icon--arrow" src={arrow} />
            <p>
              {speed} Km/s {degree} Degree
            </p>
          </div>
          <div className="right">
            <p>Sunrise: {sunrise}</p>
            <p>Sunset: {sunset}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherWidget;
