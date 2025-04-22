import axios from "axios";

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
});

export default axiosInstance; // Make sure you export the axiosInstance
