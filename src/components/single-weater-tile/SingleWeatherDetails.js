import "./single-weather-tile.css"

const WeatherDetails = ({ data, color, handleSingleTile }) => {

    const handleBackBtnClick = () => {
        handleSingleTile("")
    }

    return (

        <div className="single-weather-tile">
            <div className="single-top" style={{"backgroundColor": color}}>
                <div className="back-btn" onClick={handleBackBtnClick}>
                    <img alt="weather" className="btn-ico" src="back-arrow-invert.png" />
                </div>
                <div className="single-top-content">
                    <div className="single-top-center">
                        <p className="single-city">{data.name},{data.sys.country}</p>
                        <p>{new Date(data.dt * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true})}, {new Date(data.dt * 1000).toLocaleString('en-US', {month: 'short', day: 'numeric'})}</p>
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
                <img alt="arrow" className="arrow-icon" src="arrowhead-invert.png" />
                    <p>{data.wind.speed}Km/s {data.wind.deg}Degree</p>
                </div>
                <div className="single-col col-3">
                    <p>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute:'numeric' })}</p>
                    <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute:'numeric' })}</p>
                </div>
            </div>
        </div>
    
    );
}
 
export default WeatherDetails;