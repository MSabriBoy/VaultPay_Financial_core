import apiClient from "./apiClient";

const createCheckoutSession = async (invoiceId) => {
  const response = await apiClient.post(
    `/payments/checkout/${invoiceId}`
  );

  return response.data;
};

export {
  createCheckoutSession,
};