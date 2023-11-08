import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/product",
});

export async function getProducts() {
  try {
    const response = await api.get("/query");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductByCode(code) {
  try {
    const response = await api.get(`/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createProduct(product) {
  try {
    const response = await api.post("/create", product);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateProduct(product) {
  try {
    const response = await api.put(`/update/${product.purrPetCode}`, product);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
