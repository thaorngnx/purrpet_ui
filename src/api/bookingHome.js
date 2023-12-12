import api from "./token";

export async function getBookingHomes(params) {
  try {
    const response = await api.get("bookingHome/query", { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getBookingHomeByCode(code) {
  try {
    const response = await api.get(`bookingHome/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getBookingHomeByCustomer() {
  try {
    const response = await api.get("bookingHome/get-by-customer");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createBookingHome(bookingHome) {
  try {
    const response = await api.post("bookingHome/create", bookingHome);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateBookingHome(bookingHome) {
  try {
    const response = await api.put(
      `bookingHome/update/${bookingHome.purrPetCode}`,
      bookingHome,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateStatusBookingHome(bookingHomeCode, newStatus) {
  try {
    const response = await api.put(
      `bookingHome/update-status/${bookingHomeCode}`,
      { status: newStatus },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getUnavailableDay(params) {
  try {
    const response = await api.get("bookingHome/get-unavailable-day", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
