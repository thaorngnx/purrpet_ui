import api from "./token";

if (cookie.get("access_token")) {
  api.defaults.headers.common["Authorization"] =
    "Bearer " + cookie.get("access_token");
}

export async function getHomestays() {
  try {
    const response = await api.get("homestay/query");
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

export async function createHomestay(product) {
  try {
    const response = await api.post("homestay/create", product);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateHomestay(product) {
  try {
    const response = await api.put(
      `homestay/update/${product.purrPetCode}`,
      product,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
