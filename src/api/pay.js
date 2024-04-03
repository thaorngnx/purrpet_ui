import api from "./token";

export async function createPaymentUrl(body) {
  try {
    const response = await api.post("pay/createPaymentUrl", body);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function vnpayReturn(body) {
  try {
    const response = await api.post("pay/vnpayReturn", body);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function reportRevenue(body) {
  try {
    const response = await api.post("pay/financialReport", body);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
