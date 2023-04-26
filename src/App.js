import './App.css';
import { useState, useEffect } from 'react';
import Search from './components/search/Search';
import WeatherTile from './components/weather-tile/WeatherTile';
import WeatherDetails from './components/single-weater-tile/SingleWeatherDetails';
import { CACHE_KEY, EXPIRATION_TIME, SERVER_URL, UNITS } from './constants';
// import { dotenv } from "dotenv"

function App() {

  // dotenv.config()

  const [singleTileData, setSingleTileData] = useState("")
  const [weatherData, setWeatherData] = useState([])
  const [tileColor, setTileColor] = useState("")

  const handleSingleTile = (data, color) => {
    setSingleTileData(data)
    setTileColor(color)
  }

  const removeTile = (event, id) => {
      setWeatherData(weatherData.filter(obj => obj.id !== id))
      event.stopPropagation()
  }

  useEffect(() => {

    async function fetchData() {
      try {
        const cityDataResponse = await fetch('/cities.json');
        const cityData = await cityDataResponse.json();
  
        const weatherDataPromises = cityData.List.map(async (city) => {
          const cacheCity = JSON.parse(localStorage.getItem(city.CityCode));
  
          if (cacheCity && Date.now() - cacheCity.cachedTime < city.ExpTime) {
            return cacheCity.data;
          } else {
            const weatherDataResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city.CityCode}&units=${UNITS}&APPID=83dd8a350290b263b44e060cb003ebf3`);
            const weatherData = await weatherDataResponse.json();
            localStorage.setItem(city.CityCode, JSON.stringify({ data: weatherData, cachedTime: Date.now() }));
            return weatherData;
          }
        });
  
        const weatherData = await Promise.all(weatherDataPromises);
        setWeatherData(weatherData);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, [])

  
  return (
    <div className="container">
      
      <nav>
        <img className="logo" src="logo.png" />
        <h3>Weather App</h3>
      </nav>

      <section>
        <Search />
      </section>

      <section className="tiles">

        {!singleTileData && weatherData.map((data, index) => (
          <WeatherTile key={index} data={data} handleSingleTile={handleSingleTile}  removeTile={removeTile} />
        ))}
        {singleTileData && <WeatherDetails data={singleTileData} color={tileColor} handleSingleTile={handleSingleTile} />}

      </section>

      <footer>
        <p>2023 Fidenz Technologies</p>
      </footer>
    </div>
  );
}

export default App;
