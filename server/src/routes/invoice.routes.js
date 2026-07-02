import { Router } from "express";

import {
  createInvoice,
  getInvoices,
  getInvoiceDetails,
  getReceipt,
} from "../controllers/invoice.controller.js";

import { protect, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.use(protect);

router.get("/", getInvoices);

router.get("/:invoiceId", getInvoiceDetails);
router.get("/:invoiceId/receipt", getReceipt);

router.post(
  "/",
  authorize(ROLES.ADMIN),
  createInvoice
);

export default router;