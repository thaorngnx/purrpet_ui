import api from "./token";
import Cookie from "js-cookie";

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
    if (
      response.data.err === 0 &&
      response.data.access_token !== null &&
      response.data.refresh_token !== null
    ) {
      const path = "/";

      Cookie.set(
        import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN,
        response.data.access_token,
        {
          secure: true,
          sameSite: "strict",
          expires: 366,
          path: path,
        },
      );

      Cookie.set(
        import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN,
        response.data.refresh_token,
        {
          secure: true,
          sameSite: "strict",
          expires: 366,
          path: path,
        },
      );
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
