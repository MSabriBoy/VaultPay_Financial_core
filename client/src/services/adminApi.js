import apiClient from "./apiClient";

const getClients = async () => {
  const response = await apiClient.get("/admin/clients");

  return response.data;
};

export {
  getClients,
};