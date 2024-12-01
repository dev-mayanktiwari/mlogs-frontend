import axios from "axios";

const BASEURL = "http://localhost:3000/api/v1";

export const api = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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

export const postComment = async (postId: string, text: string) => {
  const response = await api.post(`/user/blog/${postId}/comment`, { text });
  return response.data.data;
};

export const likePost = async (postId: string) => {
  const response = await api.put(`/user/blog/${postId}/like`);
  return response.data.data;
};

export const unlikePost = async (postId: string) => {
  const response = await api.put(`/user/blog/${postId}/unlike`);
  return response.data.data;
};
