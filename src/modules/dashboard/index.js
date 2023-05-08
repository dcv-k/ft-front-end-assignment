import { createContext, useEffect, useState } from "react";
import { getCities } from "./api/getCities";
import WeatherWidgetContainer from "./containers/WeatherWidgetContainer";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import ErrorFallback from "components/error/ErrorFallback";

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
