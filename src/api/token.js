import axios from "axios";
import Cookie from "js-cookie";
import { refreshToken } from "./auth";
import { jwtDecode } from "jwt-decode";

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
    //get path to set Cookie
    const path = window.location.pathname;

    if (Cookie.get(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN)) {
      config.headers["Authorization"] = `Bearer ${Cookie.get(
        import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN,
        {
          path: path,
        },
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
    return response;
  },
  async (error) => {
    // console.log("error", error);
    // const originalRequest = error.config;
    // console.log("orin", originalRequest);
    // if (
    //   error.response.status === 401 &&
    //   originalRequest.url === import.meta.env.VITE_API_REFRESH_TOKEN_URL
    // ) {
    //   window.location.href = import.meta.env.VITE_APP_ROUTE_LOGIN;
    //   return Promise.reject(error);
    // }

    // if (
    //   error.response.status === 401 &&
    //   !originalRequest._retry &&
    //   originalRequest.url !== import.meta.env.VITE_API_REFRESH_TOKEN_URL
    // ) {
    //   originalRequest._retry = true;
    //   try {
    //     const refresh_token = Cookie.get(
    //       import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN,
    //     );
    //     if (jwtDecode(refresh_token).exp < Date.now() / 1000) {
    //       console.log("refresh token expired");
    //       Cookie.remove(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN);
    //       Cookie.remove(import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN);
    //       window.location.pathname = import.meta.env.VITE_APP_ROUTE_LOGIN;
    //       return Promise.reject(error);
    //     }

    //     console.log("refresh token not expired");
    //     const response = await refreshToken();

    //     console.log("after refresh", response);
    //     const access_token = response.access_token;
    //     const decodedAccessToken = jwtDecode(access_token);
    //     Cookie.set(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN, access_token, {
    //       path: decodedAccessToken.path,
    //     });
    //     api.defaults.headers["Authorization"] =
    //       "Bearer " + Cookie.get(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN);
    //     return api(originalRequest);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    //if req is not refresh token, code 401 -> check refresh token expired -> if not expired -> refresh token -> set new access token -> set new header -> call api again
    //if req is refresh token, code 401 -> redirect to login page
    console.log("error", error);
    console.log("error", error.response);
    const originalRequest = error.config;
    console.log("orin", originalRequest);
    console.log("url", originalRequest.url);
    console.log("refresh", import.meta.env.VITE_API_REFRESH_TOKEN_URL);
    console.log(
      "check",
      originalRequest.url === import.meta.env.VITE_API_REFRESH_TOKEN_URL,
    );
    console.log("retry", originalRequest._retry);
    if (
      error.response.status === 401 &&
      originalRequest.url === import.meta.env.VITE_API_REFRESH_TOKEN_URL
    ) {
      window.location.href = import.meta.env.VITE_APP_ROUTE_LOGIN;
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      originalRequest._retry > 1 &&
      originalRequest.url !== import.meta.env.VITE_API_REFRESH_TOKEN_URL
    ) {
      originalRequest._retry++;
      try {
        const refresh_token = Cookie.get(
          import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN,
        );
        if (jwtDecode(refresh_token).exp < Date.now() / 1000) {
          console.log("refresh token expired");
          Cookie.remove(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN);
          Cookie.remove(import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN);
          window.location.pathname = import.meta.env.VITE_APP_ROUTE_LOGIN;
          return Promise.reject(error);
        }

        console.log("refresh token not expired");
        const response = await refreshToken();

        console.log("after refresh", response);
        const access_token = response.access_token;
        const decodedAccessToken = jwtDecode(access_token);
        Cookie.set(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN, access_token, {
          path: decodedAccessToken.path,
        });
        api.defaults.headers["Authorization"] =
          "Bearer " + Cookie.get(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN);
        return api(originalRequest);
      } catch (error) {
        console.error(error);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
