import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/order",
});

export async function getOrders() {
  try {
    const response = await api.get("/query");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getOrderByCode(code) {
  try {
    const response = await api.get(`/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createOrder(order) {
  try {
    const response = await api.post("/create", order);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateOrder(order) {
  try {
    const response = await api.put(`/update/${order.purrPetCode}`, order);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
