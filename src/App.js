import './App.css';
import { UNITS } from './constants';
import { timeToMilliseconds } from './utils';
import { useState, useEffect, useRef } from 'react';
import Search from './components/search/Search';
import WeatherTile from './components/weather-tile/WeatherTile';
import SingleWeatherTile from './components/single-weater-tile/SingleWeatherTile';

function App() {

  const [weatherData, setWeatherData] = useState([])
  const [singleTileData, setSingleTileData] = useState("")
  // const intervalRef = useRef(null);

  const handleSingleTile = (data) => {
    setSingleTileData(data)
  }

  const removeTile = (event, id) => {
      setWeatherData(weatherData.filter(obj => obj.id !== id))
      event.stopPropagation()
  }

  useEffect(() => {

    document.title = "Weather App";

    async function fetchData() {
      try {
        // STEP 1: Read city data including cache expire time for each city 
        const cityDataResponse = await fetch('/data/cities.json');
        const cityData = await cityDataResponse.json();
  
        const weatherDataPromises = cityData.List.map(async (city) => {

          // STEP 2: Check for cache data and make API calls if cache isn't available
          const cacheCity = JSON.parse(localStorage.getItem(city.CityCode));
  
          if (cacheCity && Date.now() - cacheCity.cachedTime < timeToMilliseconds(city.ExpTime, city.ExpTimeUnit)) {
            
            console.log("loading cached data for: ", city.CityName)
            return cacheCity.data;

          } else {

            const weatherDataResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city.CityCode}&units=${UNITS}&APPID=${process.env.REACT_APP_API_KEY}`);
            const weatherData = await weatherDataResponse.json();
            
            localStorage.setItem(city.CityCode, JSON.stringify({ data: weatherData, cachedTime: Date.now() }));
            console.log("***saved new cache data for: ", city.CityName)
            
            return weatherData;
          }

        });
  
        try {
          const weatherData = await Promise.all(weatherDataPromises);
          setWeatherData(weatherData);
        } catch (error) {
          console.log("error fetching data")
        }

        // const minExpTime = Math.min(
        //   ...cityData.List.map((city) =>
        //     timeToMilliseconds(city.ExpTime, city.ExpTimeUnit)
        //   )
        // );

        // if (intervalRef.current) {
        //   clearInterval(intervalRef.current);
        // }
  
        // intervalRef.current = setInterval(() => {
        //   console.log("re-fetching data");
        //   fetchData();
        // }, minExpTime);

      } catch (error) {
        console.error(error);
      }
    }

    fetchData();

    // return () => {
    //   console.log("cleanup")
    //   clearInterval(intervalRef.current);
    // }
  }, [])

  
  return (
    <div className="container">
      
      <nav>
        <img className="logo" src="/images/logo.png" alt="logo"/>
        <p>Weather App</p>
      </nav>

      <section>
        <Search />
      </section>

      <div className="content">
        <section className="tiles">

          {!singleTileData && weatherData.map((data, index) => (
            <WeatherTile key={index} data={data} handleSingleTile={handleSingleTile}  removeTile={removeTile} />
          ))}
          {singleTileData && <SingleWeatherTile data={singleTileData} handleSingleTile={handleSingleTile} />}

        </section>
      </div>

      <footer>
        <p>2023 Fidenz Technologies</p>
      </footer>
    </div>
  );
}

export default App;
