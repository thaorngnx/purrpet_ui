import api from "./token";

export async function getActiveSuppliers(params) {
  try {
    const response = await api.get("supplier/get-all", { params });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function createSupplier(supplier) {
  try {
    const response = await api.post("supplier/create", supplier);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateSupplier(supplier) {
    try {
        const response = await api.put(`supplier/update/${supplier.purrPetCode}`, supplier);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    }
export async function updateStatusSupplier(purrPetCode) {
    try {
        const response = await api.post(`supplier/update-status/${purrPetCode}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}