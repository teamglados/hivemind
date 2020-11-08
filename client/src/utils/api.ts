import axios from "axios";
import qs from "qs";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://192.168.218.120:8000/"
    : process.env.REACT_APP_API_URL;

const api = axios.create({ baseURL });

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

export const answerQuestion = async ({
  id,
  answer,
}: {
  id: number;
  answer: string;
}) => {
  const params = qs.stringify({ question_id: id, value: answer });
  const res = await api.get(`/answers/add?${params}`);
  return res.data;
};

export const addHint = async ({
  questionId,
  hint,
}: {
  questionId: number;
  hint: string;
}) => {
  const params = qs.stringify({ question_id: questionId, value: hint });
  const res = await api.get(`/hints/add?${params}`);
  return res.data;
};

export const getHints = async ({ questionId }: { questionId: number }) => {
  const params = qs.stringify({ question_id: questionId });
  const res = await api.get(`/hints/list?${params}`);
  return res.data;
};

export const voteHint = async ({
  hintId,
  score,
}: {
  hintId: number;
  score: 1 | -1;
}) => {
  const params = qs.stringify({ hint_id: hintId, score });
  const res = await api.get(`/hints/vote?${params}`);
  return res.data;
};

export const openHint = async ({ hintId }: { hintId: number }) => {
  const params = qs.stringify({ hint_id: hintId });
  const res = await api.get(`/hints/open?${params}`);
  return res.data;
};
