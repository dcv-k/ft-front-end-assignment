import { CityListContext } from "component/controllers/DashboardController";
import WeatherWidgetController from "component/controllers/WeatherWidgetController";
import { useContext } from "react";

const Dashboard = () => {
  const { cityList } = useContext(CityListContext);
  return (
    <>
      {cityList.map((city) => (
        <WeatherWidgetController key={city.CityCode} city={city} />
      ))}
    </>
  );
};

export default Dashboard;
