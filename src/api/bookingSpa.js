import api from "./token";

export async function getBookingSpas(params) {
  try {
    const response = await api.get("bookingSpa/query", { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getBookingSpaByCode(code) {
  try {
    const response = await api.get(`bookingSpa/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getBookingSpaByCustomer() {
  try {
    const response = await api.get("bookingSpa/get-by-customer");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createBookingSpa(bookingSpa) {
  try {
    const response = await api.post("bookingSpa/create", bookingSpa);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateBookingSpa(bookingSpa) {
  try {
    const response = await api.put(
      `bookingSpa/update/${bookingSpa.purrPetCode}`,
      bookingSpa,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateStatusBookingSpa(bookingSpaCode, newStatus) {
  try {
    const response = await api.put(
      `bookingSpa/update-status/${bookingSpaCode}`,
      { status: newStatus },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAvailableTime(params) {
  try {
    const response = await api.get("bookingSpa/get-available-time", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
