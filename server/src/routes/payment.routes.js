import { Router } from "express";

import { createCheckoutSession } from "../controllers/payment.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protect);

router.post(
  "/checkout/:invoiceId",
  createCheckoutSession
);

export default router;