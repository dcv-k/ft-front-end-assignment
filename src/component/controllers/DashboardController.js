import Dashboard from "component/views/Dashboard/Dashboard";
import { CityListModel } from "model/CityListModel";

import { createContext, useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

export const CityListContext = createContext();

const DashboardController = () => {
  const [cityList, setCityList] = useState(null);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = new CityListModel();
        await data.componentDidMount();
        setCityList(data.state.cityList);
      } catch (error) {
        showBoundary(error);
      }
    };

    fetchCities();
  }, []);

  return (
    <>
      <CityListContext.Provider value={{ cityList, setCityList }}>
        {cityList && <Dashboard />}
      </CityListContext.Provider>
    </>
  );
};

export default DashboardController;
