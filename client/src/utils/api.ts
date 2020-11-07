import axios from "axios";
import qs from "qs";

const api = axios.create({
  baseURL: "http://192.168.218.120:8000/",
});

api.interceptors.request.use(
  (config) => {
    config.params = config.params || {};
    config.params.token = localStorage.getItem("token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("> API response", response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (name: string) => {
  const params = qs.stringify({ name });
  const res = await api.post(`/login?${params}`);
  return res.data;
};

export const getQuestions = async () => {
  const res = await api.get("/questions/list");
  return res.data;
};
