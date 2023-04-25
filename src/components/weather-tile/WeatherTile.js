import "./weather-tile.css"

const WeatherTile = ({ data, handleSingleTile, removeTile }) => {
    
    const handleTileClick = (color) => {
        handleSingleTile(data, color)
    }

    const handleDeleteClick = (e) => {
        removeTile(e, data.id)
    }

    const bg = ["#388EE7", "#6249CC", "#40B681", "#DE944E", "#9C3A3A"]
    
    return (

        <div className="weather-tile" onClick={() => handleTileClick(bg[data.id % 5])}>
            <div className="top" style={{"backgroundColor": bg[data.id % 5]}}>
                <div className="delete-wrap">
                    <img alt="close" onClick={handleDeleteClick} className="delete-icon" src={"cross.png"} />
                </div>
                <div className="top-content">
                    <div className="top-left">
                        <p className="city">{data.name},{data.sys.country}</p>
                        <p>{new Date(data.dt * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true})}, {new Date(data.dt * 1000).toLocaleString('en-US', {month: 'short', day: 'numeric'})}</p>
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
                    <p>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute:'numeric' })}</p>
                    <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute:'numeric' })}</p>
                </div>
            </div>
        </div>
    
    );
}
 
export default WeatherTile;