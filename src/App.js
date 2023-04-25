import './App.css';
import { useState, useEffect } from 'react';
import Search from './components/search/Search';
import WeatherTile from './components/weather-tile/WeatherTile';
import WeatherDetails from './components/single-weater-tile/SingleWeatherDetails';
import { CACHE_KEY, EXPIRATION_TIME, SERVER_URL } from './constants';

function App() {

  const API_ENDPOINT = `${SERVER_URL}/api`;

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

    document.title = "Weather App";

    const cachedData = localStorage.getItem(CACHE_KEY)
    const cachedTime = localStorage.getItem(`${CACHE_KEY}_time`)

    // STEP 4: Using cached data that is not expired
    if (cachedData && cachedTime && Date.now() - cachedTime < EXPIRATION_TIME) {

      setWeatherData(JSON.parse(cachedData))

    } else {

      fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data.data)
        // STEP 4: Saving fetch data and time to local storage 
        localStorage.setItem(CACHE_KEY, JSON.stringify(data.data))
        localStorage.setItem(`${CACHE_KEY}_time`, Date.now())
      })
      .catch((error) => console.error(error));

    }

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
