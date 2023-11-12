import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie"; // Giả sử bạn đã cài đặt thư viện cookie

const cookie = new Cookies();
async function checkValidToken(originalRequest, path) {
  try {
    console.log("incheck", path);
    if (cookie.get("access_token")) {
      const decodedAccessToken = jwtDecode(cookie.get("access_token"));
      if (decodedAccessToken.exp * 1000 > Date.now()) {
        return true;
      }
    } else if (cookie.get("refresh_token")) {
      const decodedRefreshToken = jwtDecode(cookie.get("refresh_token"));
      if (decodedRefreshToken.exp * 1000 > Date.now()) {
        const response = await refreshToken();
        if (response.err === 0) {
          return true;
        } else {
          window.location.href = `${path}/login`;
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export function setupApiInterceptor() {
  const path = window.location.pathname;
  console.log("path", path);
  axios.interceptors.request.use(
    console.log("interceptor"),
    async function (config) {
      const path = window.location.pathname;
      console.log("path", path);
      if (path !== "/login") {
        const validToken = await checkValidToken(config, path);
        console.log("validToken", validToken);
        if (validToken) {
          config.headers["Authorization"] =
            "Bearer " + cookie.get("access_token");
        } else {
          window.location.href = `${path}/login`;
        }
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );
  axios.interceptors.response.use(
    (response) => {
      console.log("inter", response);
      return response;
    },
    async function (error) {
      console.log("inerr", error);
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        console.log("in401", error);
        originalRequest._retry = true;
        const validToken = await checkValidToken(originalRequest, path);
        console.log("validToken", validToken);
        if (validToken) {
          originalRequest.headers["Authorization"] =
            "Bearer " + cookie.get("access_token");
          return axios(originalRequest);
        }
      }
      return Promise.reject(error);
    },
  );
}
