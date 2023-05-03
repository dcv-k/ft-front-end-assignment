import { useNavigate } from "react-router-dom";
import "../styles/Details.css";

const Details = ({ weather }) => {
  const navigate = useNavigate();

  const handleBackBtnClick = () => {
    navigate("/");
  };

  return (
    <div className="single-weather-tile">
      <div
        className={
          "w-" +
          weather?.weather[0].description.split(" ").join("-") +
          " single-top"
        }
      >
        <div className="back-btn" onClick={handleBackBtnClick}>
          <img
            alt="weather"
            className="btn-ico"
            src="/images/back-arrow-invert.png"
          />
        </div>
        <div className="single-top-content">
          <div className="single-top-center">
            <p className="single-city">
              {weather?.name},{weather?.sys.country}
            </p>
            <p>{weather?.dt}</p>
          </div>
          <div className="single-top-row">
            <div className="single-description-wrap">
              <img
                alt="weather"
                className="single-weather-icon"
                src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
              />
              <p className="single-weather-description">
                {weather?.weather[0].description}
              </p>
            </div>
            <div>
              <p className="single-temperature">
                {Math.floor(weather?.main.temp)}&deg;c
              </p>
              <p className="single-temperature-max">
                Temp Min: {Math.floor(weather?.main.temp_max)}&deg;c
              </p>
              <p className="single-temperature-min">
                Temp Max: {Math.floor(weather?.main.temp_min)}&deg;c
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="single-bottom">
        <div className="single-col col-1">
          <p>Pressure: {weather?.main.pressure}hPa</p>
          <p>Humidity: {weather?.main.humidity}%</p>
          <p>Visibility: {(weather?.visibility / 1000).toFixed(1)}Km</p>
        </div>
        <div className="single-col col-2">
          <img
            alt="arrow"
            className="arrow-icon"
            src="/images/arrowhead-invert.png"
          />
          <p>
            {weather?.wind.speed}Km/s {weather?.wind.deg}Degree
          </p>
        </div>
        <div className="single-col col-3">
          <p>Sunrise: {weather?.sys.sunrise}</p>
          <p>Sunset: {weather?.sys.sunset}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
