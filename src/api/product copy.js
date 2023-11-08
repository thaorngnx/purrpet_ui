import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/bookingSpa",
});

export async function getBookingSpas() {
  try {
    const response = await api.get("/query");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getBookingSpaByCode(code) {
  try {
    const response = await api.get(`/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createBookingSpa(bookingSpa) {
  try {
    const response = await api.post("/create", bookingSpa);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateBookingSpa(bookingSpa) {
  try {
    const response = await api.put(
      `/update/${bookingSpa.purrPetCode}`,
      bookingSpa,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
