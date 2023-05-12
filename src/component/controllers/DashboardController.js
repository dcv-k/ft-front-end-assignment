import Dashboard from "component/views/Dashboard/Dashboard";
import CityListModel from "model/CityListModel";
import { createContext, useEffect, useState } from "react";

export const CityListContext = createContext();

const DashboardController = () => {
  const [cityList, setCityList] = useState(null);

  useEffect(() => {
    const fetchCities = () => {
      try {
        const data = CityListModel();
        setCityList(data);
      } catch (error) {
        console.log("dashboard", error);
      }
    };

    fetchCities();
  }, []);

  return (
    <>
      <CityListContext.Provider value={{ cityList }}>
        {cityList && <Dashboard />}
      </CityListContext.Provider>
    </>
  );
};

export default DashboardController;
