import api from "./token";

export async function getSpas() {
  try {
    const response = await api.get("spa/query");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getSpaByCode(code) {
  try {
    const response = await api.get(`spa/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createSpa(spa) {
  try {
    const response = await api.post("spa/create", spa);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateSpa(spa) {
  try {
    const response = await api.put(`spa/update/${spa.purrPetCode}`, spa);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
