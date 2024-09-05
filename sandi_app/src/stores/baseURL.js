import axios from "axios";
import router from "@/router";

axios.defaults.withCredentials = false;
axios.defaults.headers.post["Content-Type"] = "application/json";

const APIAxios = axios.create({
    baseURL: import.meta.env.VITE_SANDIAPI_URL
});

const RTXAxios = axios.create({
    baseURL: import.meta.env.VITE_RTX_URL
});

APIAxios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken'); // o sessionStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

APIAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401 && router.currentRoute.value.meta.requiresAuth){
        localStorage.removeItem("authToken");
        router.push({name: 'Login'});
      }
    }
  return Promise.reject(error);
  }
);

export { APIAxios, RTXAxios };