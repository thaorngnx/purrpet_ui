import axios from "axios";
import Cookie from "universal-cookie";
import { refreshToken } from "./auth";
import { jwtDecode } from "jwt-decode";

const cookie = new Cookie();

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
  },
});

api.interceptors.request.use(
  (config) => {
    if (cookie.get("access_token")) {
      config.headers["Authorization"] = `Bearer ${cookie.get("access_token")}`;
    }
    console.log(config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log("orin", originalRequest);
    if (
      error.response.status === 401 &&
      originalRequest.url === "http://localhost:3000/api/auth/refresh"
    ) {
      window.location.href = "admin/login";
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "http://localhost:3000/api/auth/refresh"
    ) {
      originalRequest._retry = true;
      try {
        const refresh_token = cookie.get("refresh_token");
        if (jwtDecode(refresh_token).exp < Date.now() / 1000) {
          console.log("refresh token expired");
          cookie.remove("access_token", { path: "/admin" });
          cookie.remove("refresh_token", { path: "/admin" });
          window.location.href = "/admin/login";
          return Promise.reject(error);
        }
        console.log("refresh token not expired");
        const response = await refreshToken();
        console.log("after refresh", response);
        const access_token = response.access_token;
        cookie.set("access_token", access_token, { path: "/admin" });
        api.defaults.headers["Authorization"] =
          "Bearer " + cookie.get("access_token");
        return api(originalRequest);
      } catch (error) {
        console.error(error);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
