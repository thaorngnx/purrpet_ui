import api from "./token";

export async function getCustomers(params) {
  try {
    console.log(params);
    const response = await api.get("customer/query", { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCustomerByCode(code) {
  try {
    const response = await api.get(`customer/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCustomerById(id) {
  try {
    const response = await api.post(`customer/find-by-id/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createCustomer(customer) {
  try {
    const response = await api.post("customer/create", customer);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateCustomer(customer) {
  try {
    const response = await api.put(
      `customer/update/${customer.purrPetCode}`,
      customer,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function lookUpOrder(customer) {
  try {
    const response = await api.put("customer/lookUpOrder", customer);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
