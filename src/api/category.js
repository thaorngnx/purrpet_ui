import api from "./token";

export async function getCategories(params) {
  try {
    const response = await api.get("category/query", { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getActiveCategories(params) {
  try {
    const response = await api.get("category/query-customer", { params });
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
    const response = await api.post("category/create", category);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateCategory(category) {
  try {
    const response = await api.put(
      `category/update/${category.purrPetCode}`,
      category,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateStatusCategory(purrPetCode) {
  try {
    const response = await api.put(`category/update-status/${purrPetCode}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
