import WeatherWidget from "../WeatherWidget/WeatherWidget";
import { useCityList } from "model/useCityList";

const Dashboard = () => {
  const { cityList, setCityList } = useCityList();

  return (
    <>
      {cityList &&
        cityList.map((city) => (
          <WeatherWidget
            key={city.CityCode}
            city={city}
            setCityList={setCityList}
          />
        ))}
    </>
  );
};

export default Dashboard;
