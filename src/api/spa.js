import api from "./token";

export async function getSpas(params) {
  try {
    const response = await api.get("spa/query", { params });
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
    const response = await api.post("spa/create", spa, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateSpa(spa) {
  try {
    const response = await api.put(`spa/update/${spa.purrPetCode}`, spa, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateStatusSpa(purrPetCode) {
  try {
    const response = await api.put(`spa/update-status/${purrPetCode}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
