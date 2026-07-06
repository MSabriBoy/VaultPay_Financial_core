import { Router } from "express";

import {
  getDashboardStats,
  getClients,
} from "../controllers/admin.controller.js";

import { protect, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.use(protect);

router.use(authorize(ROLES.ADMIN));

router.get("/clients", getClients);

export default router;