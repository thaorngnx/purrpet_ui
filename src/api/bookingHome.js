import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/bookingHome",
});

export async function getBookingHomes() {
  try {
    const response = await api.get("/query");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getBookingHomeByCode(code) {
  try {
    const response = await api.get(`/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createBookingHome(bookingHome) {
  try {
    const response = await api.post("/create", bookingHome);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateBookingHome(bookingHome) {
  try {
    const response = await api.put(
      `/update/${bookingHome.purrPetCode}`,
      bookingHome,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
