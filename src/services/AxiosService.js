import axios from "axios";
import localStorageService from "./LocalStorageService";

export const ENDPOINT = "http://localhost:5500";
const BASE_URL = ENDPOINT + "/api";

const AxiosUtility = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = async (instance) => {
  const { token } = await JSON.parse(localStorageService.fetch("user"));
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

export default AxiosUtility;
