import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/homestay",
});

export async function getHomestays() {
  try {
    const response = await api.get("/query");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getHomestayByCode(code) {
  try {
    const response = await api.get(`/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createHomestay(product) {
  try {
    const response = await api.post("/create", product);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateHomestay(product) {
  try {
    const response = await api.put(`/update/${product.purrPetCode}`, product);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
