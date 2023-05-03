import { useEffect, useState } from "react";
import { getCities } from "./api/getCities";
import WeatherWidgetContainer from "./containers/WeatherWidgetContainer";

export default function () {
  const [cities, setCities] = useState(null);

  const removeWidget = (event, id) => {
    setCities(cities.filter((obj) => obj.CityCode !== id));
    event.stopPropagation();
  };

  useEffect(() => {
    const fetchCities = async () => {
      const cities = await getCities();
      setCities(cities.List);
    };
    fetchCities();
  }, []);

  return (
    <>
      {cities &&
        cities.map((city, index) => (
          <WeatherWidgetContainer
            key={index}
            city={city}
            removeWidget={removeWidget}
          />
        ))}
    </>
  );
}
