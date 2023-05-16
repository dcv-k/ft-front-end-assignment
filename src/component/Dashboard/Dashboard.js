import { useEffect, useState } from "react";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";

import WidgetError from "../WidgetError/WidgetError";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import { useCityList } from "model/useCityList";

const Dashboard = () => {
  const { cityList, setCityList } = useCityList();

  return (
    <>
      {cityList &&
        cityList.map((city) => (
          <ErrorBoundary FallbackComponent={WidgetError}>
            <WeatherWidget key={city.CityCode} city={city} />
          </ErrorBoundary>
        ))}
    </>
  );
};

export default Dashboard;
