import axios from "axios";
import Cookie from "js-cookie";
import { refreshToken } from "./auth";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,DELETE,POST,OPTIONS",
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
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url !== import.meta.env.VITE_API_REFRESH_TOKEN_URL
    ) {
      console.log("refresh token nè");
      originalRequest._retry++;
      try {
        const refresh_token = Cookie.get(
          import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN,
        );
        const decode = jwtDecode(refresh_token);
        if (decode.exp < Date.now() / 1000) {
          console.log("refresh token expired");
          Cookie.remove(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN, {
            path: decode.path,
          });
          Cookie.remove(import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN, {
            path: decode.path,
          });
          //reload page
          window.location.reload();
          return Promise.reject(error);
        }

        console.log("refresh token not expired");
        const response = await refreshToken();

        if (!response) {
          console.log("refresh token vô dụng rồi!!!");
          Cookie.remove(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN, 
            { path: decode.path });
          Cookie.remove(import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN, 
            { path: decode.path });
          //reload page
          window.location.reload();
          return Promise.reject(error);
        }

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
    } else if (error.response.status === 401) {
      Cookie.remove(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN);
      Cookie.remove(import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN);
      //reload page
      window.location.reload();
    }
    return Promise.reject(error);
  },
);

export default api;
