import { createContext } from "react";

import Dashboard from "component/views/Dashboard/Dashboard";
import { useCityList } from "model/useCityList";

export const CityListContext = createContext();

const DashboardController = () => {
  const { cityList, setCityList } = useCityList();

  return (
    <>
      <CityListContext.Provider value={{ cityList, setCityList }}>
        {cityList && <Dashboard />}
      </CityListContext.Provider>
    </>
  );
};

export default DashboardController;
