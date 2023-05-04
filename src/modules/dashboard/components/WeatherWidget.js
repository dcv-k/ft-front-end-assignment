import { useContext } from "react";
import "./WeatherWidget.css";
import { useNavigate } from "react-router-dom";
import { WeatherWidgetContext } from "..";

const WeatherWidget = ({ weather }) => {
  const navigate = useNavigate();
  const { cities, setCities } = useContext(WeatherWidgetContext);

  function handleClick() {
    navigate(`/${weather.id}`);
  }

  function handleDeleteClick(e) {
    // setCities(cities.filter((obj) => obj.CityCode !== weather.id));
    e.stopPropagation();
  }

  return (
    <div className="weather-tile" onClick={handleClick}>
      <div className={weather.className + " top"}>
        <div className="delete-wrap">
          <img
            alt="close"
            onClick={handleDeleteClick}
            className="delete-icon"
            src={weather.crossImage}
          />
        </div>
        <div className="top-content">
          <div className="top-left">
            <p className="city">
              {weather.name},{weather.sys.country}
            </p>
            <p>{weather.dt}</p>
            <div className="description-wrap">
              <img alt="weather" className="weather-icon" src={weather.icon} />
              <p className="weather-description">{weather.description}</p>
            </div>
          </div>
          <div>
            <p className="temperature">{weather.main.temp} &deg;c</p>
            <p className="temperature-min">
              Temp Min: {weather.main.temp_max} &deg;c
            </p>
            <p className="temperature-max">
              Temp Max: {weather.main.temp_min} &deg;c
            </p>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="col-1">
          <p>Pressure: {weather.main.pressure}hPa</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Visibility: {weather.visibility}Km</p>
        </div>
        <div className="col-2">
          <img
            alt="arrow"
            className="arrow-icon"
            src={weather.arrowHeadImage}
          />
          <p>
            {weather.wind.speed} Km/s {weather.wind.deg} Degree
          </p>
        </div>
        <div className="col-3">
          <p>Sunrise: {weather.sys.sunrise}</p>
          <p>Sunset: {weather.sys.sunset}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
