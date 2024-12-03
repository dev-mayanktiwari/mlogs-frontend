import { toast } from "@/hooks/use-toast";
import useLogout from "@/hooks/useLogout";
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

// Variables to handle refresh logic
let isRefreshing = false;
let refreshSubscribers = [];

// Add a subscriber for token refresh
const subscribeToTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// Notify all subscribers once the token has been refreshed
const onTokenRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

// Axios response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 (Unauthorized) and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark this request as retried

      if (isRefreshing) {
        // If a refresh is already in progress, wait for it
        return new Promise((resolve, reject) => {
          subscribeToTokenRefresh(() => {
            resolve(api(originalRequest)); // Retry the original request
          });
        });
      }

      // Start the refresh token process
      isRefreshing = true;

      try {
        // Call the refresh token endpoint
        await api.post("/user/auth/refresh-token");

        // Notify all subscribers that the token has been refreshed
        onTokenRefreshed();

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Clear subscribers if refresh fails
        refreshSubscribers = [];

        // Logout the user
        const { logout } = useLogout();
        logout();

        // Show an error toast
        toast({
          title: "Session Expired",
          duration: 5000,
          description: "Please login again.",
          variant: "destructive",
        });

        // Reject the original error
        return Promise.reject(refreshError);
      } finally {
        // Reset the refreshing flag
        isRefreshing = false;
      }
    }

    // Reject all other errors
    return Promise.reject(error);
  }
);

export default api;
