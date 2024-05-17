import api from "./token";
export async function getCoins(params) {
  try {
    const response = await api.get("coin/getCoin", { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}