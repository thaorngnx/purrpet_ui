import api from "./token";

export async function getBookingHomes() {
  try {
    const response = await api.get("bookingHome/query");
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
