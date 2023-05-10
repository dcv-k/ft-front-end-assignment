import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { createContext, useEffect, useState } from "react";

import { getCities } from "./api/getCities";
import WeatherWidgetContainer from "./containers/WeatherWidgetContainer";
import ErrorAPI from "components/error/ErrorAPI";

export const WeatherWidgetContext = createContext();

// eslint-disable-next-line
export default function () {
  const [cities, setCities] = useState(null);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { List } = await getCities();
        setCities(List);
      } catch (error) {
        showBoundary(error);
      }
    };
    fetchCities();
  }, []);

  return (
    <>
      {cities &&
        cities.map((city) => (
          <ErrorBoundary FallbackComponent={ErrorAPI}>
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
