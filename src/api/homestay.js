import api from "./token";

export async function getHomestays(params) {
  try {
    const response = await api.get("homestay/query", { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getActiveHomestays(params) {
  try {
    const response = await api.get("homestay/query-customer", { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getHomestayByCode(code) {
  try {
    const response = await api.get(`homestay/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createHomestay(homestay) {
  try {
    const response = await api.post("homestay/create", homestay, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateHomestay(homestay) {
  try {
    const response = await api.put(
      `homestay/update/${homestay.purrPetCode}`,
      homestay,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateStatusHomestay(purrPetCode) {
  try {
    const response = await api.put(`homestay/update-status/${purrPetCode}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
