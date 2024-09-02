import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

const APIAxios = axios.create({
    baseURL: import.meta.env.VITE_SANDIAPI_URL

});

const RTXAxios = axios.create({
    baseURL: import.meta.env.VITE_RTX_URL
});

export { APIAxios, RTXAxios };