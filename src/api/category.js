import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/category",
});

export async function getCategories(params) {
  try {
    const response = await api.get("/query", { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCategoryByCode(code) {
  try {
    const response = await api.get(`/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createCategory(category) {
  try {
    const response = await api.post("/create", category);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateCategory(category) {
  try {
    const response = await api.put(`/update/${category.purrPetCode}`, category);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
