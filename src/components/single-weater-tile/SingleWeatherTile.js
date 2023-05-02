import "./single-weather-tile.css"
import { formatTime, formatTimeAndDate } from "../../utils"

const WeatherDetails = ({ data, handleSingleTile }) => {

    const handleBackBtnClick = () => {
        handleSingleTile("")
    }

    return (

        <div className="single-weather-tile">
            <div className={"w-" + data.weather[0].description.split(" ").join("-") + " single-top"}>
                <div className="back-btn" onClick={handleBackBtnClick}>
                    <img alt="weather" className="btn-ico" src="/images/back-arrow-invert.png" />
                </div>
                <div className="single-top-content">
                    <div className="single-top-center">
                        <p className="single-city">{data.name},{data.sys.country}</p>
                        <p>{formatTimeAndDate(data.dt)}</p>
                    </div>
                    <div className="single-top-row">
                        <div className="single-description-wrap">
                            <img alt="weather" className="single-weather-icon" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} />
                            <p className="single-weather-description">{data.weather[0].description}</p>
                        </div>
                        <div>
                            <p className="single-temperature">{Math.floor(data.main.temp)}&deg;c</p>
                            <p className="single-temperature-max">Temp Min: {Math.floor(data.main.temp_max)}&deg;c</p>
                            <p className="single-temperature-min">Temp Max: {Math.floor(data.main.temp_min)}&deg;c</p>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="single-bottom">
                <div className="single-col col-1">
                    <p>Pressure: {data.main.pressure}hPa</p>
                    <p>Humidity: {data.main.humidity}%</p>
                    <p>Visibility: {(data.visibility / 1000).toFixed(1)}Km</p>
                </div>
                <div className="single-col col-2">
                <img alt="arrow" className="arrow-icon" src="/images/arrowhead-invert.png" />
                    <p>{data.wind.speed}Km/s {data.wind.deg}Degree</p>
                </div>
                <div className="single-col col-3">
                    <p>Sunrise: {formatTime(data.sys.sunrise)}</p>
                    <p>Sunset: {formatTime(data.sys.sunset)}</p>
                </div>
            </div>
        </div>
    
    );
}
 
export default WeatherDetails;