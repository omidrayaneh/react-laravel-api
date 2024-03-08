import axios from "axios";

const Axios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
});
Axios.interceptors.request.use((config) => {
  const token = decodeURIComponent(document.cookie.replace("XSRF-TOKEN=", ""));
 
  Axios.defaults.headers["X-XSRF-TOKEN"] = token;

  return config;
});

export default Axios;
