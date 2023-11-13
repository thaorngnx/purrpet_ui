import api from "./token";

export async function getAccounts() {
  try {
    const response = await api.get("account/query");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAccountByCode(code) {
  try {
    const response = await api.get(`account/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createAccount(account) {
  try {
    const response = await api.post("account/create", account);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateAccount(account) {
  try {
    const response = await api.put(
      `account/update/${account.purrPetCode}`,
      account,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateStatusAccount(purrPetCode) {
  try {
    const response = await api.put(`account/update-status/${purrPetCode}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
