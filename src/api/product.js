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
export async function createDiscount(data) {
  try {
    const response = await api.post("product/create-promotion", data);
    return response.data;
  }
  catch (error) {
    console.error(error);
  }
}

export async function cancelDiscount(data) {
  try {
    const response = await api.post("product/cancel-promotion", data);
    return response.data;
  }
  catch (error) {
    console.error(error);
  }
}

export async function getProductBestSeller(params) {
  try {
    const response = await api.get('product/best-seller', { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductDetailByCode(code) {
  try {
    const response = await api.get(`product/detail/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductPromotionForCus(params) {
  try {
    const response = await api.get("product/query-customer-promotion", { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function getNewProduct(params) {
  try {
    const response = await api.get("product/new-product", { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
