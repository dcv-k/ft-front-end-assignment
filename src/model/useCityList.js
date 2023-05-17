import { useState, useEffect } from "react";

import { PATH_JSON } from "../constants";
import { useAPIHandler } from "../helpers/useAPIHandler";

function useCityList() {
  const { getCities } = useAPIHandler();
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { List } = await getCities(PATH_JSON);
        setCityList(List);
      } catch (error) {}
    }
    fetchData();
  }, []);

  return { cityList, setCityList };
}

export { useCityList };
