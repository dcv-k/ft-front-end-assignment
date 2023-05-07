import { API_URL } from "../config";
import { LOCAL_URL } from "../config";

const local = {
  get: async (url, options) => {
    const response = await fetch(LOCAL_URL + url, options);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = await response.json();
    return data;
  },
};

const api = {
  get: async (url, options) => {
    const response = await fetch(API_URL + url, options);
    if (!response.ok) {
      console.log("fetch error");
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = await response.json();
    return data;
  },
};

export { local, api };
