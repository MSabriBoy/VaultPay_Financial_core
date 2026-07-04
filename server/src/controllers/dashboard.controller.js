import asyncHandler from "../utils/asyncHandler.js";

import {
  getAdminDashboardStats,
  getClientDashboardStats,
} from "../services/dashboard.service.js";

const getAdminDashboard = asyncHandler(async (req, res) => {
  const dashboard = await getAdminDashboardStats();

  res.status(200).json({
    success: true,
    data: dashboard,
  });
});

const getClientDashboard = asyncHandler(async (req, res) => {
  const dashboard = await getClientDashboardStats(req.user._id);

  res.status(200).json({
    success: true,
    data: dashboard,
  });
});

export {
  getAdminDashboard,
  getClientDashboard,
};