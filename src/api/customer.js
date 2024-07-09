import api from "./token";
import Cookie from "js-cookie";

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

export async function getCustomerById() {
  try {
    const response = await api.get(`customer/find-by-id`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createCustomer(customer) {
  try {
    const response = await api.post("customer/create", customer);
    console.log(response.data.data);
    if (
      response.data.err === 0 &&
      response.data.data.accessToken !== null &&
      response.data.data.refreshToken !== null
    ) {
      const path = "/";

      Cookie.set(
        import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN,
        response.data.data.accessToken,
        {
          secure: true,
          sameSite: "strict",
          expires: 366,
          path: path,
        },
      );

      Cookie.set(
        import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN,
        response.data.data.refreshToken,
        {
          secure: true,
          sameSite: "strict",
          expires: 366,
          path: path,
        },
      );
    }
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

export async function getCustomerByEmail(email) {
  try {
    const response = await api.post(`customer/getbyEmail/`, email);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createCustomerByStaff(customer) {
  try {
    const response = await api.post(`customer/createcus-staff`, customer);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
