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

  const handleBackBtnClick = () => {
    navigate("/");
  };

  return (
    <div className="single-weather-tile">
      <div className={color + " single-top"}>
        <div className="back-btn" onClick={handleBackBtnClick}>
          <img alt="weather" className="btn-ico" src={back} />
        </div>
        <div className="single-top-content">
          <div className="single-top-center">
            <p className="single-city">
              {name},{country}
            </p>
            <p>{dateTime}</p>
          </div>
          <div className="single-top-row">
            <div className="single-description-wrap">
              <img alt="weather" className="single-weather-icon" src={icon} />
              <p className="single-weather-description">{description}</p>
            </div>
            <div>
              <p className="single-temperature">{temperature} &deg;c</p>
              <p className="single-temperature-max">
                Temp Min: {minTemperature} &deg;c
              </p>
              <p className="single-temperature-min">
                Temp Max: {maxTemperature} &deg;c
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="single-bottom">
        <div className="single-col col-1">
          <p>Pressure: {pressure}hPa</p>
          <p>Humidity: {humidity}%</p>
          <p>Visibility: {visibility}Km</p>
        </div>
        <div className="single-col col-2">
          <img alt="arrow" className="arrow-icon" src={arrow} />
          <p>
            {speed}Km/s {degree}Degree
          </p>
        </div>
        <div className="single-col col-3">
          <p>Sunrise: {sunrise}</p>
          <p>Sunset: {sunset}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
