import { ErrorBoundary } from "react-error-boundary";
import { createContext, useEffect, useState } from "react";

import { getCities } from "./api/getCities";
import WeatherWidgetContainer from "./containers/WeatherWidgetContainer";
import JSONError from "components/error/JSONError";

export const WeatherWidgetContext = createContext();

// eslint-disable-next-line
export default function () {
  const [cities, setCities] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { List } = await getCities();
        setCities(List);
      } catch (error) {
        console.log("error");
      }
    };
    fetchCities();
  }, []);

  return (
    <>
      {cities &&
        cities.map((city) => (
          <ErrorBoundary FallbackComponent={JSONError}>
            <WeatherWidgetContext.Provider
              key={city.CityCode}
              value={{ cities, setCities }}
            >
              <WeatherWidgetContainer city={city} />
            </WeatherWidgetContext.Provider>
          </ErrorBoundary>
        ))}
    </>
  );
}
