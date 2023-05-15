import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { PATH_JSON } from "constants";
import { useAPIHandler } from "./useAPIHandler";

function useCityList() {
  const { getCities } = useAPIHandler();
  const { showBoundary } = useErrorBoundary();
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { List } = await getCities(PATH_JSON);
        setCityList(List);
      } catch (error) {
        showBoundary(error);
      }
    }
    fetchData();
  }, [showBoundary]);

  return { cityList, setCityList };
}

export { useCityList };
