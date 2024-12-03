import api from "./apiclient";

export const login = async (email: string, password: string) => {
  const response = await api.post("/user/auth/login", { email, password });
  console.log(response);
  return response.data.data;
};

export const logout = async () => {
  const response = await api.put("/blog/fetch/logout");
  return response.data.data;
};

export const postComment = async (postId: string, text: string) => {
  const response = await api.post(`/user/blog/${postId}/comment`, { text });
  return response.data;
};

export const updateComment = async (commentId: string, text: string) => {
  const response = await api.put(`/user/blog/${commentId}/edit-comment`, {
    text,
  });
  return response.data.data;
};

export const deleteComment = async (commentId: string) => {
  const response = await api.delete(`user/blog/${commentId}/uncomment`);
  return response.data.data;
};

export const likePost = async (postId: string) => {
  const response = await api.post(`/user/blog/${postId}/like`);
  return response.data.data;
};

export const unlikePost = async (postId: string) => {
  const response = await api.delete(`/user/blog/${postId}/unlike`);
  return response.data.data;
};

export const postGuestbook = async (message: string) => {
  const response = await api.post("user/blog/guestbook", { message });
  return response.data;
};

export const changePassword = async (oldPassword: string, newPassword: string, confirmNewPassword: string) => {
  const response = await api.put("user/auth/change-password", { oldPassword, newPassword, confirmNewPassword });
  return response.data;
}

export const forgotPassword = async (email: string) => {
  const response = await api.put("user/auth/forgot-password", { email });
  return response.data;
}
export const register = async (
  name: string,
  email: string,
  password: string,
  username: string
) => {
  const response = await api.post("/user/auth/register", {
    name,
    email,
    password,
    username,
  });
  return response.data.data;
};
