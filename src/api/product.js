import api from "./token";

export async function getProducts(params) {
  try {
    const response = await api.get("product/query", { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getActiveProducts(params) {
  try {
    const response = await api.get("product/query-customer", { params });
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
    console.log("req", product);
    const response = await api.post("product/create", product, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateProduct(product) {
  try {
    console.log("req", product);
    const response = await api.put(
      `product/update/${product.purrPetCode}`,
      product,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
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

export async function reportProduct(date){
  try {
    const response = await api.post(`product/report-product`, date );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductStaff(params) {
  try {
    const response = await api.get("product/query-staff", { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
