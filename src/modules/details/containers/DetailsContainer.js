import { getWeather } from "api/getWeather";
import Details from "../components/Details";
import { formatTime } from "utils/formatTime";
import { formatTimeAndDate } from "utils/formatDateAndTime";
import { useEffect, useState } from "react";

const DetailsContainer = ({ cityCode }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather(cityCode) {
      const weather = await getWeather(cityCode);

      weather.dt = formatTimeAndDate(weather.dt);
      weather.sys.sunrise = formatTime(weather.sys.sunrise);
      weather.sys.sunset = formatTime(weather.sys.sunset);
      setWeather(weather);
    }

    fetchWeather(cityCode);
  }, []);

  return <>{weather && <Details weather={weather} />}</>;
};

export default DetailsContainer;
