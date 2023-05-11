import Axios from "axios";
import { API_URL } from "../constants";

export const local = Axios.create({
  baseURL: process.env.PUBLIC_URL,
});

export const api = Axios.create({
  baseURL: API_URL,
});

local.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return error.message;
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return error.message;
  }
);
