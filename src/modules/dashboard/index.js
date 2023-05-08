import { ErrorBoundary } from "react-error-boundary";
import { createContext, useEffect, useState } from "react";

import { getCities } from "./api/getCities";
import ErrorFallback from "components/error/ErrorFallback";
import WeatherWidgetContainer from "./containers/WeatherWidgetContainer";

export const WeatherWidgetContext = createContext();

// eslint-disable-next-line
export default function () {
  const [cities, setCities] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { List } = await getCities();
        setCities(List);
      } catch (error) {}
    };
    fetchCities();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {cities &&
        cities.map((city) => (
          <WeatherWidgetContext.Provider
            key={city.CityCode}
            value={{ cities, setCities }}
          >
            <WeatherWidgetContainer city={city} />
          </WeatherWidgetContext.Provider>
        ))}
    </ErrorBoundary>
  );
}
