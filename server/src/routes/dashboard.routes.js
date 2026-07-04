import express from "express";

import {
  getAdminDashboard,
  getClientDashboard,
} from "../controllers/dashboard.controller.js";

import { protect, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.get(
  "/admin",
  protect,
  authorize(ROLES.ADMIN),
  getAdminDashboard
);

router.get(
  "/client",
  protect,
  authorize(ROLES.CLIENT),
  getClientDashboard
);

export default router;