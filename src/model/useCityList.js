import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { PATH_JSON } from "utils/constants";
import { useAPIHandler } from "utils/useAPIHandler";

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
  }, [getCities, showBoundary]);

  return { cityList, setCityList };
}

export { useCityList };
