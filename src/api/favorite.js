import api from "./token";

export async function getAllFavorite(params) {
  try {
    const response = await api.get("favorite", { params });
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    }
}

export async function favoriteProduct(productCode) {
    try {
        const response = await api.post(`favorite/${productCode}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}