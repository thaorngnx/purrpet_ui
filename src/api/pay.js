import api from "./token";

export async function createPaymentUrl(body) {
  try {
    const response = await api.post("pay/createPaymentUrl", body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// export async function vnpayReturn(body) {
//   try {
//     const response = await api.post("pay/vnpayReturn", body);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// }
export async function reportRevenue(body) {
  try {
    const response = await api.post("pay/financialReport", body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function requestRefund(body) {
  try {
    const response = await api.post('pay/request-refund', body);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function acceptRefund(body) {
  try {
    const response = await api.post("pay/accept-refund", body);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function rejectRefund(body) {
  try {
    const response = await api.post("pay/cancel-refund", body);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function getRefundRequest() {
  try {
    const response = await api.get("pay/get-refund");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function RefundByAdmin(body) {
  try {
    const response = await api.post("pay/refund", body);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getSpendingStatistic() {
  try {
    const response = await api.get("pay/spendingstatistic");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}