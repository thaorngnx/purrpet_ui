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

export async function createReview(review) {
    try {
      const response = await api.post("review/create", review);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

export async function getReviewByCodeAndCustomer(orderCode, productCode) {
    try {
      const response = await api.get(`product/customer/${orderCode}/${productCode}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }