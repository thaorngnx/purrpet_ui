import axios from "axios";
import Cookie from "universal-cookie";
import { refreshToken } from "./auth";
import { jwtDecode } from "jwt-decode";

const cookie = new Cookie();

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,PATCH,POST,OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
  },
});

api.interceptors.request.use(
  (config) => {
    if (cookie.get(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN)) {
      config.headers["Authorization"] = `Bearer ${cookie.get(
        import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN,
      )}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    //if request is api logout, remove token, redirect to login page
    if (response.request.responseURL === import.meta.env.VITE_API_LOGOUT_URL) {
      cookie.remove(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN);
      cookie.remove(import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN);
      window.location.href = import.meta.env.VITE_APP_ROUTE_LOGIN;
    }
    return response;
  },
  async (error) => {
    console.log("error", error);
    const originalRequest = error.config;
    console.log("orin", originalRequest);
    if (
      error.response.status === 401 &&
      originalRequest.url === import.meta.env.VITE_API_REFRESH_TOKEN_URL
    ) {
      window.location.href = import.meta.env.VITE_APP_ROUTE_LOGIN;
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== import.meta.env.VITE_API_REFRESH_TOKEN_URL
    ) {
      originalRequest._retry = true;
      try {
        const refresh_token = cookie.get(
          import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN,
        );
        if (jwtDecode(refresh_token).exp < Date.now() / 1000) {
          console.log("refresh token expired");
          cookie.remove(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN, {
            path: import.meta.env.VITE_APP_PATH_ADMIN,
          });
          cookie.remove(import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN, {
            path: import.meta.env.VITE_APP_PATH_ADMIN,
          });
          window.location.href = import.meta.env.VITE_APP_ROUTE_LOGIN;
          return Promise.reject(error);
        }
        console.log("refresh token not expired");
        const response = await refreshToken();
        console.log("after refresh", response);
        const access_token = response.access_token;
        cookie.set(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN, access_token, {
          path: import.meta.env.VITE_APP_PATH_ADMIN,
        });
        api.defaults.headers["Authorization"] =
          "Bearer " + cookie.get(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN);
        return api(originalRequest);
      } catch (error) {
        console.error(error);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
