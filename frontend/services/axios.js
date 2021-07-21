import axios from "axios";
import { getToken } from "../utils/general";

axios.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";

    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
