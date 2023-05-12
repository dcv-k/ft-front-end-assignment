import { useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";

import WidgetError from "../WidgetError/WidgetError";
import { CityListContext } from "component/controllers/DashboardController";
import WeatherWidgetController from "component/controllers/WeatherWidgetController";

const Dashboard = () => {
  const { cityList } = useContext(CityListContext);
  return (
    <>
      {cityList.map((city) => (
        <ErrorBoundary FallbackComponent={WidgetError}>
          <WeatherWidgetController key={city.CityCode} city={city} />
        </ErrorBoundary>
      ))}
    </>
  );
};

export default Dashboard;
