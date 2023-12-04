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

  expirationDate.setDate(expirationDate.getDate() + 365);
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
    const response = await api.post("auth/logout");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
