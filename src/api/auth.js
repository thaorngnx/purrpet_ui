import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import api from "./token";

const saveToken = (response) => {
  const decodedAccessToken = jwtDecode(response.data.access_token);
  Cookie.set(
    import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN,
    response.data.access_token,
    {
      secure: true,
      sameSite: "strict",
      expires: 366,
      path: decodedAccessToken.path,
    },
  );

  Cookie.set(
    import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN,
    response.data.refresh_token,
    {
      secure: true,
      sameSite: "strict",
      expires: 366,
      path: decodedAccessToken.path,
    },
  );
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
      refresh_token: Cookie.get(import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN),
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
    Cookie.remove(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN);
    Cookie.remove(import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
