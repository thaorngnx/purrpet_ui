import api from "./token";

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
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
