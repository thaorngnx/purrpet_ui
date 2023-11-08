import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/account",
});

export async function getAccounts() {
  try {
    const response = await api.get("/query");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAccountByCode(code) {
  try {
    const response = await api.get(`/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createAccount(account) {
  try {
    const response = await api.post("/create", account);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateAccount(account) {
  try {
    const response = await api.put(`/update/${account.purrPetCode}`, account);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
