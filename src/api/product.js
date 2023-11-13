import api from "./token";

export async function getProducts() {
  try {
    const response = await api.get("product/query");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductByCode(code) {
  try {
    const response = await api.get(`product/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createProduct(product) {
  try {
    const response = await api.post("product/create", product);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateProduct(product) {
  try {
    const response = await api.put(
      `product/update/${product.purrPetCode}`,
      product,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateStatusProduct(purrPetCode) {
  try {
    const response = await api.put(`product/update-status/${purrPetCode}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
