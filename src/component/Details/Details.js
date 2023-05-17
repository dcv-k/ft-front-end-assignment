import { useLocation, useNavigate } from "react-router-dom";
import "./Details.css";
import { UNITS } from "constants";
import { API_KEY } from "constants";
import { API_URL } from "constants";
import useApiHandler from "hooks/useApiHandler";
import { useEffect, useState } from "react";
import { useWeatherFormat } from "hooks/useWeatherFormat";

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [weather, setWeather] = useState();
  const { formatWeatherData } = useWeatherFormat();
  const { apiHandler } = useApiHandler();

  const { cityCode } = location.state;

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
      try {
        const data = await apiHandler(getWeatherData, cityCode, UNITS, API_KEY);
        setWeather(data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const {
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
    back,
    arrow,
  } = weather || {};

  const handleBackClick = () => {
    navigate("/");
  };

  // const getCity = async (cityCode, path) => {
  //   const { List } = await fetchData(LOCAL_URL + path);
  //   return await List.find((city) => city.CityCode === cityCode);
  // };

  return (
    <div className="weather-details">
      <div className={color + " top"}>
        <div className="btn-back" onClick={handleBackClick}>
          <img alt="weather" className="icon--back" src={back} />
        </div>
        <div className="content">
          <div className="center">
            <p className="city">
              {name},{country}
            </p>
            <p>{dateTime}</p>
          </div>
          <div className="row">
            <div className="left">
              <img alt="weather" className="icon--weather" src={icon} />
              <p className="description">{description}</p>
            </div>
            <div className="right">
              <p className="temperature">{temperature} &deg;c</p>
              <p className="temperature-max">
                Temp Min: {minTemperature} &deg;c
              </p>
              <p className="temperature-min">
                Temp Max: {maxTemperature} &deg;c
              </p>
            </div>
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
            {speed}Km/s {degree}Degree
          </p>
        </div>
        <div className="right">
          <p>Sunrise: {sunrise}</p>
          <p>Sunset: {sunset}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
