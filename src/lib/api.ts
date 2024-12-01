import axios from "axios";

const BASEURL = "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
