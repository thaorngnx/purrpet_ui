import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/spa",
});

export async function getSpas() {
  try {
    const response = await api.get("/query");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getSpaByCode(code) {
  try {
    const response = await api.get(`/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createSpa(spa) {
  try {
    const response = await api.post("/create", spa);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateSpa(spa) {
  try {
    const response = await api.put(`/update/${spa.purrPetCode}`, spa);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
