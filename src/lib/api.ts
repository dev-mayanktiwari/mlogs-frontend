import axios from "axios";

const BASEURL = "http://localhost:3000/api/v1";

export const api = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (email: string, password: string) => {
  const response = await api.post("/user/auth/login", { email, password });
  console.log(response);
  return response.data.data;
};

export const logout = async () => {
  const response = await api.put("/user/auth/logout");
  return response.data.data;
};
