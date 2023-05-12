import { CityListContext } from "component/controllers/DashboardController";
import { useContext } from "react";

const Dashboard = () => {
  const { cityList } = useContext(CityListContext);
  return (
    <>
      {cityList.map((city) => (
        <WeatherWidgetController city={city} />
      ))}
    </>
  );
};

export default Dashboard;
