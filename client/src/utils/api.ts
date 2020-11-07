import axios from "axios";

const api = axios.create({
  baseURL: "",
  headers: { "X-Custom-Header": "foobar" },
});

export const login = async (user: string) => {
  // const res = await api.post("/login", { user });
  // return res.data as { token: string };
  return { token: "" };
};
