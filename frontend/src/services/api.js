import axios from "axios";

// Create an Axios instance with a default base URL
const API = axios.create({
  baseURL: "/api", // All requests will be prefixed with /api
});


// Add Authorization header automatically
API.interceptors.request.use((req) => {
  // Get JWT token from sessionStorage
  const token = sessionStorage.getItem("token");

  // If token exists, attach it to the Authorization header
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req; // Continue with the request
});

export default API;
