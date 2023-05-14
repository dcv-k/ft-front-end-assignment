import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { local } from "utils/API";
import { PATH_JSON } from "utils/constants";

function useCityList() {
  const { showBoundary } = useErrorBoundary();
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { List } = await local.get(PATH_JSON);
        setCityList(List);
      } catch (error) {
        showBoundary(error);
      }
    }
    fetchData();
  }, []);

  return { cityList, setCityList };
}

export { useCityList };
