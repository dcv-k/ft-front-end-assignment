import "../tile.css"
import "./weather-tile.css"
import { formatTimeAndDate, formatTime } from "../../services"

const WeatherTile = ({ data, handleSingleTile, removeTile }) => {
    
    const handleTileClick = () => {
        handleSingleTile(data)
    }

    const handleDeleteClick = (e) => {
        removeTile(e, data.id)
    }
    
    return (

        <div className="weather-tile" onClick={handleTileClick}>
            <div className={"w-" + data.weather[0].description.split(" ").join("-") + " top"}>
                <div className="delete-wrap">
                    <img alt="close" onClick={handleDeleteClick} className="delete-icon" src={"cross.png"} />
                </div>
                <div className="top-content">
                    <div className="top-left">
                        <p className="city">{data.name},{data.sys.country}</p>
                        <p>{formatTimeAndDate(data.dt)}</p>
                        <div className="description-wrap">
                            <img alt="weather" className="weather-icon" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} />
                            <p className="weather-description">{data.weather[0].description}</p>
                        </div>
                    </div>
                    <div>
                        <p className="temperature">{Math.floor(data.main.temp)} &deg;c</p>
                        <p className="temperature-min">Temp Min: {Math.floor(data.main.temp_max)} &deg;c</p>
                        <p className="temperature-max">Temp Max: {Math.floor(data.main.temp_min)} &deg;c</p>
                    </div> 
                </div>
            </div>
            <div className="bottom">
                <div className="col-1">
                    <p>Pressure: {data.main.pressure}hPa</p>
                    <p>Humidity: {data.main.humidity}%</p>
                    <p>Visibility: {(data.visibility / 1000).toFixed(1)}Km</p>
                </div>
                <div className="col-2">
                    <img alt="arrow" className="arrow-icon" src="arrowhead-invert.png" />
                    <p>{data.wind.speed} Km/s {data.wind.deg} Degree</p>
                </div>
                <div className="col-3">
                    <p>Sunrise: {formatTime(data.sys.sunrise)}</p>
                    <p>Sunset: {formatTime(data.sys.sunset)}</p>
                </div>
            </div>
        </div>
    
    );
}
 
export default WeatherTile;