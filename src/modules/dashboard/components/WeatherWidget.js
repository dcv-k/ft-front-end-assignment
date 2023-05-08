import { useContext, useEffect } from "react";
import "./WeatherWidget.css";
import { useNavigate } from "react-router-dom";
import { WeatherWidgetContext } from "..";

const WeatherWidget = ({ weather }) => {
  const navigate = useNavigate();
  const { cities, setCities } = useContext(WeatherWidgetContext);

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
  } = weather;

  function handleClick() {
    navigate(`/${id}`);
  }

  function handleDeleteClick(e) {
    setCities(cities.filter(({ CityCode }) => CityCode !== String(id)));
    e.stopPropagation();
  }

  useEffect(() => {}, [cities]);

  return (
    <div className="weather-tile" onClick={handleClick}>
      <div className={color + " top"}>
        <div className="delete-wrap">
          <img
            alt="close"
            onClick={handleDeleteClick}
            className="delete-icon"
            src={cross}
          />
        </div>
        <div className="top-content">
          <div className="top-left">
            <p className="city">
              {name},{country}
            </p>
            <p>{dateTime}</p>
            <div className="description-wrap">
              <img alt="weather" className="weather-icon" src={icon} />
              <p className="weather-description">{description}</p>
            </div>
          </div>
          <div>
            <p className="temperature">{temperature} &deg;c</p>
            <p className="temperature-min">Temp Min: {minTemperature} &deg;c</p>
            <p className="temperature-max">Temp Max: {maxTemperature} &deg;c</p>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="col-1">
          <p>Pressure: {pressure}hPa</p>
          <p>Humidity: {humidity}%</p>
          <p>Visibility: {visibility}Km</p>
        </div>
        <div className="col-2">
          <img alt="arrow" className="arrow-icon" src={arrow} />
          <p>
            {speed} Km/s {degree} Degree
          </p>
        </div>
        <div className="col-3">
          <p>Sunrise: {sunrise}</p>
          <p>Sunset: {sunset}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
