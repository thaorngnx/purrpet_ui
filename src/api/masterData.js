import api from "./token";

export async function getMasterDatas() {
  try {
    const response = await api.get("masterData/query");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMasterDataByCode(code) {
  try {
    const response = await api.get(`masterData/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createMasterData(masterData) {
  try {
    const response = await api.post("masterData/create", masterData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateMasterData(masterData) {
  try {
    const response = await api.put(
      `masterData/update/${masterData.purrPetCode}`,
      masterData,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// export async function updateStatusMasterData(purrPetCode) {
//   try {
//     const response = await api.put(`masterData/update-status/${purrPetCode}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// }
