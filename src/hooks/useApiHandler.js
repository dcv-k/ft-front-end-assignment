import { useState } from "react";

const useApiHandler = () => {
  const [error, setError] = useState(null);

  const apiHandler = async (apiFunction, ...args) => {
    setError(null);

    try {
      const response = await apiFunction(...args);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  return { error, apiHandler };
};

export default useApiHandler;
