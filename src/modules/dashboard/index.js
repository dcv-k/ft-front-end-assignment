import { createContext, useEffect, useState } from "react";
import { getCities } from "./api/getCities";
import WeatherWidgetContainer from "./containers/WeatherWidgetContainer";

export const WeatherWidgetContext = createContext();

// eslint-disable-next-line
export default function () {
  const [cities, setCities] = useState(null);

  useEffect(() => {
    console.log("use");
    const fetchCities = async () => {
      const { List } = await getCities();
      setCities(List);
    };
    fetchCities();
  }, []);

  return (
    <>
      {cities &&
        cities.map((city, index) => (
          <WeatherWidgetContext.Provider value={{ cities, setCities }}>
            <WeatherWidgetContainer key={index} city={city} />
          </WeatherWidgetContext.Provider>
        ))}
    </>
  );
}
