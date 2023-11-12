import Cookie from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import * as CONST from "../constants";
import api from "./token";

const cookie = new Cookie();

const saveToken = (response) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);
  const decodedAccessToken = jwtDecode(response.data.access_token);
  const path =
    decodedAccessToken.role === CONST.ROLE.STAFF ? "/staff" : "/admin";
  cookie.set("access_token", response.data.access_token, {
    expires: expirationDate,
    path: path,
  });

  const decodedRefreshToken = jwtDecode(response.data.refresh_token);
  cookie.set("refresh_token", response.data.refresh_token, {
    expires: expirationDate,
    path: path,
  });
};

export async function loginStaff(account) {
  try {
    const response = await api.post("auth/staff/login", account);
    if (response.data.err === 0) {
      saveToken(response);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function loginAdmin(account) {
  try {
    const response = await api.post("auth/admin/login", account);
    if (response.data.err === 0) {
      saveToken(response);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function refreshToken() {
  try {
    const response = await api.post("auth/refresh-token", {
      refresh_token: cookie.get("refresh_token"),
    });

    if (response.data.err === 0) {
      saveToken(response);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    const response = await api.post("auth/logout", cookie.get("access_token"));
    cookie.remove("access_token");
    cookie.remove("refresh_token");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//check valid token in cookie --> if valid, continue
//if not, refresh token --> if refresh token valid, continue
//if not, redirect to login page
export async function checkValidToken(path) {
  try {
    if (cookie.get("access_token")) {
      const decodedAccessToken = jwtDecode(cookie.get("access_token"));
      console.log("ac", decodedAccessToken);
      if (decodedAccessToken.exp * 1000 > Date.now()) {
        return true;
      }
    } else if (cookie.get("refresh_token")) {
      const decodedRefreshToken = jwtDecode(cookie.get("refresh_token"));
      console.log("rf", decodedRefreshToken);
      if (decodedRefreshToken.exp * 1000 > Date.now()) {
        const response = await refreshToken();
        console.log("res", response);
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
