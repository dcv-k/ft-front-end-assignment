import { local } from "config/fetch";
import { PATH_JSON } from "constants";
import { useEffect, useState } from "react";

export default CityListModel = () => {
  const [cityList, setCityList] = useState(null);

  useEffect(() => {
    let data = getCities();
    setCityList(data);
  }, []);

  return {
    cityList,
  };
};

const getCities = () => {
  return local.get(PATH_JSON);
};
