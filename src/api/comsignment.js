import api from "./token";
export async function getComsignments(params) {
  try {
    const response = await api.get("consignment/get-all", { params });
    return response.data;
    }
    catch (error) {
    console.error(error);
    }
}
export async function createComsignment(comsignment) {
    try {
        const response = await api.post("consignment/create", comsignment);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getAllMerchandise(params) {
    try {
        const response = await api.get("consignment/get-all-merchandise", {params});
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function UpdateStatusMerchandise(id) {
    try {
        const response = await api.put(`consignment/updateStatus-merchandise/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}