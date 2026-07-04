import apiClient from "./apiClient";

const getAdminDashboard = async () => {
  const response = await apiClient.get("/dashboard/admin");

  return response.data;
};

const getClientDashboard = async () => {
  const response = await apiClient.get("/dashboard/client");

  return response.data;
};

export {
  getAdminDashboard,
  getClientDashboard,
};