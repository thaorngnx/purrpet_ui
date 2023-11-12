import api from "./token";

if (cookie.get("access_token")) {
  api.defaults.headers.common["Authorization"] =
    "Bearer " + cookie.get("access_token");
}

export async function getOrders() {
  try {
    const response = await api.get("order/query");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getOrderByCode(code) {
  try {
    const response = await api.get(`order/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createOrder(order) {
  try {
    const response = await api.post("order/create", order);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateOrder(order) {
  try {
    const response = await api.put(`order/update/${order.purrPetCode}`, order);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
