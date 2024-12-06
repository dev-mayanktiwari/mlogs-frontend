import { toast } from "@/hooks/use-toast";
import useLogout from "@/hooks/useLogout";
import axios from "axios";

const BASEURL = import.meta.env.VITE_API_URL as string;

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

// @ts-expect-error: refreshSubscribers is not typed
let refreshSubscribers = [];

// Add a subscriber for token refresh
// @ts-expect-error: subscribeToTokenRefresh is not typed
const subscribeToTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// Notify all subscribers once the token has been refreshed
const onTokenRefreshed = () => {
  // @ts-expect-error: refreshSubscribers is not typed
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

// Axios response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 (Unauthorized) and not already retried
    if (
      error.response?.status === 401 &&
      error.response?.message === "No token found" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Mark this request as retried

      if (isRefreshing) {
        // If a refresh is already in progress, wait for it
        return new Promise((resolve) => {
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

    if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      // Toast for timeout errors
      toast({
        title: "Request Timeout",
        description: "The request took too long to complete. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } else {
      // General toast for all Axios errors
      toast({
        title: "Error",
        description:
          error.response?.data?.message || error.message || "An error occurred",
        variant: "destructive",
        duration: 5000,
      });
    }

    // Reject all other errors
    return Promise.reject(error);
  }
);

export default api;
