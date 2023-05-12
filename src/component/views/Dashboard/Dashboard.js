import { CityListContext } from "component/controllers/DashboardController";
import WeatherWidgetController from "component/controllers/WeatherWidgetController";
import { useContext } from "react";
import WidgetError from "../WidgetError/WidgetError";
import { ErrorBoundary } from "react-error-boundary";

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
