import api from "./token";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export async function sendOtp(body) {
  try {
    const response = await api.post("otp/send", body);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function verifyOtp(body) {
  try {
    const response = await api.post("otp/verify", body);
    if (response.data.err === 0) {
      //save token to cookie
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      const path = "/";
      cookie.set("access_token", response.data.access_token, {
        expires: expirationDate,
        path: path,
      });

      expirationDate.setDate(expirationDate.getDate() + 365);
      cookie.set("refresh_token", response.data.refresh_token, {
        expires: expirationDate,
        path: path,
      });
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
