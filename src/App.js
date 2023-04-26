import './App.css';
import { UNITS } from './constants';
import { timeToMilliseconds } from './services';
import { useState, useEffect } from 'react';
import Search from './components/search/Search';
import WeatherTile from './components/weather-tile/WeatherTile';
import SingleWeatherTile from './components/single-weater-tile/SingleWeatherTile';

function App() {

  const [weatherData, setWeatherData] = useState([])
  const [singleTileData, setSingleTileData] = useState("")

  const handleSingleTile = (data) => {
    setSingleTileData(data)
  }

  const removeTile = (event, id) => {
      setWeatherData(weatherData.filter(obj => obj.id !== id))
      event.stopPropagation()
  }

  useEffect(() => {

    async function fetchData() {
      try {
        // STEP 1: Read city data including cache expire time for each city 
        const cityDataResponse = await fetch('/cities.json');
        const cityData = await cityDataResponse.json();
  
        const weatherDataPromises = cityData.List.map(async (city) => {

          // STEP 2: Check for cache data and make API calls if cache isn't available
          const cacheCity = JSON.parse(localStorage.getItem(city.CityCode));
  
          if (cacheCity && Date.now() - cacheCity.cachedTime < timeToMilliseconds(city.ExpTime, city.ExpTimeUnit)) {
            return cacheCity.data;
          } else {
            const weatherDataResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city.CityCode}&units=${UNITS}&APPID=${process.env.REACT_APP_API_KEY}`);
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
        <img className="logo" src="logo.png" alt="logo"/>
        <p>Weather App</p>
      </nav>

      <section>
        <Search />
      </section>

      <section className="tiles">

        {!singleTileData && weatherData.map((data, index) => (
          <WeatherTile key={index} data={data} handleSingleTile={handleSingleTile}  removeTile={removeTile} />
        ))}
        {singleTileData && <SingleWeatherTile data={singleTileData} handleSingleTile={handleSingleTile} />}

      </section>

      <footer>
        <p>2023 Fidenz Technologies</p>
      </footer>
    </div>
  );
}

export default App;
