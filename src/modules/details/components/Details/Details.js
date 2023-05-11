import { useNavigate } from "react-router-dom";

import "./Details.css";

const Details = ({ weather }) => {
  const navigate = useNavigate();

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
  } = weather;

  const handleBackClick = () => {
    navigate("/");
  };

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
