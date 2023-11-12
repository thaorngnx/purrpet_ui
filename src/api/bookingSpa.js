import api from "./token";

export async function getBookingSpas() {
  try {
    const response = await api.get("bookingSpa/query");
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
