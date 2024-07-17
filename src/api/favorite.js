import api from "./token";

export async function getFavorite(params) {
    try {
        const response = await api.get("favorite", { params });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export async function getFavoriteProductDetail(params) {
  try {
    const response = await api.get("favorite/detail", { params });
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