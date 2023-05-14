import {
  API_PROVIDER,
  PATH_ARROWHEAD,
  PATH_BACK,
  PATH_CROSS,
} from "utils/constants";

const useWeatherFormat = () => {
  const formatWeatherData = ({
    id,
    name,
    sys: { country },
    dt,
    weather,
    sys,
    main: { temp, temp_min, temp_max, pressure, humidity },
    visibility,
    wind: { speed, deg },
  }) => {
    return {
      id,
      color: `w-${weather[0].description.split(" ").join("-")}`,
      name,
      country,
      dateTime: formatTimeAndDate(dt),
      description: weather[0].description,
      sunrise: formatTime(sys.sunrise),
      sunset: formatTime(sys.sunset),
      icon: `${API_PROVIDER}/img/wn/${weather[0].icon}.png`,
      temperature: Math.floor(temp),
      maxTemperature: Math.floor(temp_max),
      minTemperature: Math.floor(temp_min),
      pressure,
      humidity,
      visibility: (visibility / 1000).toFixed(1),
      speed,
      degree: deg,
      cross: PATH_CROSS,
      arrow: PATH_ARROWHEAD,
      back: PATH_BACK,
    };
  };

  const formatTimeAndDate = (time) => {
    return (
      new Date(time * 1000).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }) +
      ", " +
      new Date(time * 1000).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      })
    );
  };

  const formatTime = (time) => {
    return new Date(time * 1000).toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
  };

  return { formatWeatherData };
};

export { useWeatherFormat };
