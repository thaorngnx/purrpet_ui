import api from "./token";

export async function getReviewByProduct(productCode, params) {
    try {
      const response = await api.get(`review/product/${productCode}`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }