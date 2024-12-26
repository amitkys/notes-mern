import axio from "axios";

import { BASE_URL } from "./contant";

const axiosInstance = axio.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.warn("No token found in localStorage");
    }
    console.log("Request headers:", config.headers); // Check headers
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
