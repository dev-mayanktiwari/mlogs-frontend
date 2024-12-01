import axios from "axios";

const BASEURL = "http://localhost:3000/api/v1";

// Create the initial API client
export const api = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshSubscribers = [];

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to unauthorized access and it's not a retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If a refresh is already in progress, wait for it
        return new Promise((resolve, reject) => {
          refreshSubscribers.push(() => {
            resolve(api(originalRequest));
          });
        });
      }

      // Mark that we're refreshing
      isRefreshing = true;
      originalRequest._retry = true;

      try {
        // Call the refresh token endpoint
        // Server will automatically set new access token cookie
        await api.post("/user/auth/refresh-token");

        // Retry the original request
        const retryResponse = await api(originalRequest);

        // Resolve all waiting requests
        refreshSubscribers.forEach((callback) => callback());
        refreshSubscribers = [];

        return retryResponse;
      } catch (refreshError) {
        // If refresh fails, clear subscribers and potentially logout
        refreshSubscribers = [];
        isRefreshing = false;

        // Optional: redirect to login or dispatch a logout action
        // window.location.href = '/login';

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;