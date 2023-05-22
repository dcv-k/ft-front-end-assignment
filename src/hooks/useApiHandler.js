import { useState } from "react";

const useApiHandler = () => {
  const [error, setError] = useState(null);

  const makeApiRequest = async (url, options) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      setError(err);
    }
  };

  return { error, makeApiRequest };
};

export default useApiHandler;
