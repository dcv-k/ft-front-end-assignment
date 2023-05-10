import { API_URL, LOCAL_URL } from "../config";

const local = {
  get: async (url, options) => {
    const response = await fetch(LOCAL_URL + url, options);
    if (response.ok) {
      throw new Error(
        `Error fetching data from JSON file: Error status - ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  },
};

const api = {
  get: async (url, options) => {
    const response = await fetch(API_URL + url, options);
    if (!response.ok) {
      throw new Error(
        `Error fetching data from Weather API: Error status - ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  },
};

export { local, api };
