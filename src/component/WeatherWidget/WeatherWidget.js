import { useNavigate } from "react-router-dom";
import "./WeatherWidget.css";
import { useWeather } from "model/useWeather";

const WeatherWidget = ({ city }) => {
  const navigate = useNavigate();
  const { weather } = useWeather(city);

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
    cross,
    arrow,
  } = weather;

  const handleClick = () => {};

  const handleRemoveClick = () => {};

  return (
    <div className="weather-widget" onClick={handleClick}>
      <div className={color + " top"}>
        <div className="remove">
          <img
            alt="close"
            onClick={handleRemoveClick}
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
            <p className="temperature-min">Temp Min: {minTemperature} &deg;c</p>
            <p className="temperature-max">Temp Max: {maxTemperature} &deg;c</p>
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
  );
};

export default WeatherWidget;
